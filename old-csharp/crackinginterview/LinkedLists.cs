using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace CrackingInterview
{
  class LinkedLists
  {
    //You have two numbers represented by a linked list, where each node contains a single digit  
    //The digits are stored in reverse order, such that the 1’s digit is at the head of the list   
    //Write a function that adds the two numbers and returns the sum as a linked list 
    [Test]
    public void SumDigits()
    {
      var number1 = new LinkedList<int>( new int[] {5, 1, 5, 1});
      var number2 = new LinkedList<int>(new int[] { 5, 9, 2 });
      var sum = Sum(number1, number2);
      CollectionAssert.AreEqual(new[] {0, 1, 8, 1}, sum);
    }

    private LinkedList<int> Sum(LinkedList<int> number1, LinkedList<int> number2)
    {
      if (!number1.Any() || !number2.Any())
        throw new ArgumentException();

      var result = new LinkedList<int>();

      var iterator1 = number1.First;
      var iterator2 = number2.First;

      int transfer = 0;
      while (iterator1 != null || iterator2 != null || transfer != 0)
      {
        int value1 = iterator1?.Value ?? 0;
        int value2 = iterator2?.Value ?? 0;
        var sum = value1 + value2 + transfer;
        transfer = sum >= 10 ? 1 : 0;
        sum = sum % 10;

        result.AddLast(new LinkedListNode<int>(sum));

        iterator1 = iterator1?.Next;
        iterator2 = iterator2?.Next;
      }

      return result;
    }

   
  }
}
