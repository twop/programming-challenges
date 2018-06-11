using System.Collections.Generic;
using NUnit.Framework;

namespace CrackingInterview
{

  public enum NodeState
  {
    Visiting,
    Visited,
    NotVisited
  }

  public class GraphNode
  {
    public List<GraphNode> Adjacents = new List<GraphNode>(0);
  }

  public class Graph
  {
    public List<GraphNode> Nodes = new List<GraphNode>();
  }
  
  [TestFixture]
  public class TreesAndGraphs
  {
    [Test]
    public void Exist()
    {
      var node1 = new GraphNode();
      var node2 = new GraphNode();
      var node3 = new GraphNode();

      node1.Adjacents.Add(node2);
      node2.Adjacents.Add(node3);

      var graph = new Graph()
      {
        Nodes = new List<GraphNode>() {node1, node2, node3}
      };

      Assert.True(IsPathExist(graph, node1, node3));
    }

    [Test]
    public void NotExist()
    {
      var node1 = new GraphNode();
      var node2 = new GraphNode();
      var node3 = new GraphNode();

      //add circle. node3 stands alone
      node1.Adjacents.Add(node2);
      node2.Adjacents.Add(node1);

      var graph = new Graph()
      {
        Nodes = new List<GraphNode>() { node1, node2, node3 }
      };

      Assert.False(IsPathExist(graph, node1, node3));
    }

    public bool IsPathExist(Graph graph, GraphNode start, GraphNode end)
    {
      var nodeStates = new Dictionary<GraphNode, NodeState>();
      foreach (var graphNode in graph.Nodes)
      {
        nodeStates[graphNode] = NodeState.NotVisited;
      }
    
      var queue = new Queue<GraphNode>();
      queue.Enqueue(start);

      while (queue.Count != 0)
      {
        GraphNode graphNode = queue.Dequeue();
        nodeStates[graphNode] = NodeState.Visiting;

        foreach (var adjecent in graphNode.Adjacents)
        {
          if (adjecent == end)
            return true;

          if (nodeStates[adjecent] == NodeState.NotVisited)
            queue.Enqueue(adjecent);
        }

        nodeStates[graphNode] = NodeState.Visited;
      }

      return false;
    }


    //4.5 page 51-126.
    //Write an algorithm to find the ‘next’ node (e g , in-order successor) 
    //of a given node in a binary search tree where each node has a link to its parent 
    public class TreeNode
    {
      public TreeNode Parent { get; set; }

      public int Value { get; set; }
      public TreeNode Left { get; set; }
      public TreeNode Right { get; set; }
    }

    public void InOrderTraversal(TreeNode node)
    {
      if (node == null)
        return;

      InOrderTraversal(node.Left);
      //DO something with root
      InOrderTraversal(node.Right);
    }

    public TreeNode FindeSuccessor(TreeNode target)
    {
      if (target.Right != null)
        return FindTheMostLeft(target.Right);
      
      if (target.Parent == null)
        return null;

      //right leaf
      if (target.Parent.Right == target)
        return FindFirstRightAncestor(target.Parent);

      return target.Parent;
    }

      private TreeNode FindFirstRightAncestor(TreeNode node)
      {
          if (node.Parent == null)
              return null;
          //we are left leaf
          if (node.Parent.Left == node)
          {
              return node.Parent;
          }

          return FindFirstRightAncestor(node.Parent);
      }

      private TreeNode FindTheMostLeft(TreeNode node)
    {
        while (node.Left != null)
        {
            node = node.Left;
        }
        return node;
    }


      //4.8 page 54-122
      //You are given a binary tree in which each node contains a value. 
      //Design an algorithm to print all paths which sum up to that value. 
      //Note that it can be any path in the tree - it does not have to start at the root.

  }
}
