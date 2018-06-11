using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace CrackingInterview
{
  [TestFixture]
  public class StacksAndQueues
  {
    //Write a program to sort a stack in ascending order  
    //You should not make any assumptions about how the stack is implemented  T
    //he following are the only functions that should be used to write this program: push | pop | peek | isEmpty 
    [Test]
    public void StackSort()
    {
      var stackToSort = new Stack<int>(new int[] { 5, 1, 4, 1 });
      var result = Sort(stackToSort);
      //CollectionAssert.AreEqual(new[] { 5, 4, 1, 1 }, result);
      CollectionAssert.AreEqual(new[] { 1, 1, 4, 5 }, result);
    }

    public Stack<int> Sort(Stack<int> stackToSort)
    {
      var result = new Stack<int>();

      while (stackToSort.Count != 0)
      {
        int element = stackToSort.Pop();
        while (result.Count != 0 && result.Peek() < element)
        {
          stackToSort.Push(result.Pop());
        }
        result.Push(element);
      }

      return result;
    }
  }
}
