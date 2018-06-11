using System.Collections.Generic;
using NUnit.Framework;


//http://www.testdome.com/Questions/Csharp/BinarySearchTree/838?testId=21&testDifficulty=Hard
//Write a function that checks if a given binary tree is a valid binary search tree. 
//A binary search tree (BST) is a binary tree where the value of each node is larger 
//or equal to the values in all the nodes in that node's left subtree and is smaller than the values in all the nodes in that node's right subtree.

//For example, for the following tree
//- n1 (Value: 1, Left: null, Right: null)
//- n2 (Value: 2, Left: n1, Right: n3)
//- n3 (Value: 3, Left: null, Right: null)
//call to IsValidBST(n2) should return true since a tree with root at n2 is a valid binary search tree. 
//Explanation: Subtrees rooted at nodes n1 and n3 are valid binary search trees as they have no children.
//A tree rooted at node n2 is a valid binary search tree since 
//its value (2) is larger or equal to the largest value in its left subtree (1, rooted at n1) 
//and is smaller than the smallest value in its right subtree (3 rooted at n3).

[TestFixture]
class ValidateBinarySearchTree
{
    public class Node
    {
        public int Value { get; set; }

        public Node Left { get; set; }

        public Node Right { get; set; }

        public Node(int value, Node left, Node right)
        {
            Value = value;
            Left = left;
            Right = right;
        }

        public override string ToString()
        {
            return Value.ToString();
        }
    }

    public class BinarySearchTree
    {
        public static bool IsValidBST(Node root)
        {
            if (root == null)
                return true;

            var stack = new Stack<Node>();
            var currentNode = root;
            int? val = null;
            bool strict = false;

            while (currentNode != null || stack.Count > 0)
            {
                if (currentNode != null)
                {
                    stack.Push( currentNode);
                    currentNode = currentNode.Left;
                }
                else if (stack.Count > 0)
                {
                    currentNode = stack.Pop();

                    if (!CheckNode(val, currentNode, strict))
                        return false;

                    val = currentNode.Value;
                    strict = false;

                    currentNode = currentNode.Right;

                    if (currentNode != null)
                        strict = true;
                }
            }

            return true;
        }

        private static bool CheckNode(int? val, Node node, bool strict)
        {
            if (!val.HasValue)
                return true;

            if (strict && val.Value >= node.Value)
            {
                return false;
            }

            if ( !strict && val.Value > node.Value)
            {
                return false;
            }
            return true;
        }
    }

    [Test]
    public static void Main()
    {
        Node n1 = new Node(1, null, null);
        Node n3 = new Node(3, null, null);
        Node n2 = new Node(2, n1, n3);

        Assert.True( BinarySearchTree.IsValidBST(n2));
        //Console.WriteLine(IsValidBST(n2));
    }

    [Test]
    public static void Edge()
    {
        Node n1 = new Node(1, null, null);
        //Node n3 = new Node(3, null, null);
        //Node n2 = new Node(2, n1, n3);

        Assert.True(BinarySearchTree.IsValidBST(n1));
        //Console.WriteLine(IsValidBST(n2));
    }

    [Test]
    public static void Complex()
    {
        //var left = new Node(0, null, null);
        Node n1 = new Node(1, null, null);
        Node n3 = new Node(3, null, new Node(4, null, null));
        Node n2 = new Node(2, n1, n3);

        Assert.True(BinarySearchTree.IsValidBST(n2));
        //Console.WriteLine(IsValidBST(n2));
    }

    [Test]
    public static void Edge2()
    {
        Node n1 = new Node(1, null, null);
        Node n3 = new Node(1, null, null);
        Node n2 = new Node(1, n1, n3);

        Assert.False(BinarySearchTree.IsValidBST(n2));
        //Console.WriteLine(IsValidBST(n2));
    }

    [Test]
    public static void LongRight()
    {
        var n4 = new Node(3, null, null);
        Node n1 = new Node(1, null, null);
        Node n3 = new Node(3, n4, new Node(5, null, null));
        Node n2 = new Node(2, n1, n3);

        Assert.True(BinarySearchTree.IsValidBST(n2));
        //Console.WriteLine(IsValidBST(n2));
    }
}

