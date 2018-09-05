// given a table of conversions (like EUR <-> USD 1.2, note it does work both ways) fill a new table with requested conversions EUR -> USD

namespace CurrencyConversion {
  type ConvRow = [string, string, number];
  type Query = [string, string];

  type Edge = { to: string; mult: number };
  type Graph = Map<string, Set<Edge>>;

  const toGraph = (table: ConvRow[]): Graph =>
    table.reduce(
      (g: Graph, [from, to, mult]) =>
        g
          .set(from, (g.get(from) || new Set<Edge>()).add({ to, mult }))
          .set(
            to,
            (g.get(to) || new Set<Edge>()).add({ to: from, mult: 1 / mult })
          ),
      new Map<string, Set<Edge>>()
    );

  type Shard = Map<string, number>;
  type Shards = Map<string, Shard>;

  const addToShard = (
    g: Graph,
    shards: Shards,
    node: string,
    visited: Set<string>,
    cur: Shard,
    path: number
  ): Shard => {
    cur.set(node, path);
    shards.set(node, cur);

    const edges = g.get(node);
    if (!edges) return cur;

    visited.add(node);

    return Array.from(edges).reduce(
      (s, { to, mult }) =>
        visited.has(to)
          ? s
          : addToShard(g, shards, to, visited, s, path * mult),
      cur
    );
  };

  const None = -1;
  const findPath = (shards: Shards, from: string, to: string): number => {
    const fromS = shards.get(from);
    const toS = shards.get(to);

    if (!toS || !fromS || toS !== fromS) return None;

    const shard = toS;
    const startToS = shard.get(from);
    const endToS = shard.get(to);

    if (startToS === undefined || endToS === undefined) {
      return None;
    }

    return startToS * (1 / endToS);
  };

  const fillConv = (table: ConvRow[], queries: Query[]): ConvRow[] => {
    const g = toGraph(table);

    type Comp = { visited: Set<string>; shards: Shards };
    const { shards } = Array.from(g.keys()).reduce<Comp>(
      ({ visited, shards }: Comp, k) =>
        visited.has(k)
          ? { visited, shards }
          : {
              visited,
              shards: shards.set(
                k,
                addToShard(g, shards, k, visited, new Map<string, number>(), 1)
              )
            },
      { visited: new Set<string>(), shards: new Map<string, Shard>() }
    );
    console.log(shards);

    return queries.map(
      ([from, to]): ConvRow => [from, to, findPath(shards, from, to)]
    );
  };

  const conversions: ConvRow[] = [
    ["US", "EUR", 1.2],
    ["FR", "US", 1],
    ["RUB", "TEN", 0.1],
    ["RUB", "BIT", 1000]
  ];

  const qs: Query[] = [["FR", "EUR"], ["FR", "RUB"], ["TEN", "BIT"]];

  console.log(fillConv(conversions, qs));
}
