// https://leetcode.com/problems/minimum-height-trees/description/

// For a undirected graph with tree characteristics, we can choose any node as the root. The result graph is then a rooted tree. Among all possible rooted trees, those with minimum height are called minimum height trees (MHTs). Given such a graph, write a function to find all the MHTs and return a list of their root labels.

// Format
// The graph contains n nodes which are labeled from 0 to n - 1. You will be given the number n and a list of undirected edges (each edge is a pair of labels).

// You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.

// Example 1 :

// Input: n = 4, edges = [[1, 0], [1, 2], [1, 3]]

//         0
//         |
//         1
//        / \
//       2   3

// Output: [1]

// Example 2 :

// Input: n = 6, edges = [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]

//      0  1  2
//       \ | /
//         3
//         |
//         4
//         |
//         5

// Output: [3, 4]

// Note:

//     According to the definition of tree on Wikipedia: “a tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.”
//     The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

namespace MinimumHeightTrees {
  type Res = {
    curDepth: number;
    vertices: Set<number>;
  };

  type Edge = [number, number];
  type Edges = Map<number, Set<number>>;

  const calcDepth = (
    stopAt: number,
    curDepth: number,
    edges: Edges,
    from: number,
    v: number
  ): number => {
    if (stopAt + 1 <= curDepth) return stopAt + 1;

    const neighbors = edges.get(v);
    if (!neighbors) return stopAt + 1;

    return Array.from(neighbors).reduce(
      (d, n) =>
        n === from
          ? d
          : Math.max(d, calcDepth(stopAt, curDepth + 1, edges, v, n)),
      curDepth
    );
  };

  const toMap = (edges: Edge[]): Edges =>
    edges.reduce<Edges>(
      (m, [a, b]) => m.set(a, add(m.get(a), b)).set(b, add(m.get(b), a)),
      new Map<number, Set<number>>()
    );

  const add = (set: Set<number> | undefined, v: number) =>
    (set || new Set<number>()).add(v);

  const findMinHeightTrees = (n: number, edges: Edge[]): number[] => {
    if (n === 1) return [0];
    const map = toMap(edges);
    const { vertices } = new Array(n).fill(0).reduce<Res>(
      (r, _, e) => {
        const depth = calcDepth(r.curDepth, 0, map, -1, e);
        return depth > r.curDepth
          ? r
          : depth < r.curDepth
            ? { curDepth: depth, vertices: new Set<number>().add(e) }
            : { ...r, vertices: r.vertices.add(e) };
      },
      {
        curDepth: Number.MAX_SAFE_INTEGER,
        vertices: new Set<number>()
      }
    );
    return Array.from(vertices);
  };

  console.log(
    "input 6, [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]] -> ",
    findMinHeightTrees(6, [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]])
  );
}
