using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace CrackingInterview
{
    [TestFixture]
    public class ArrayAndStrings
    {
      //Implement an algorithm to determine if a string has all unique characters   What if you can not use additional data structures?
      [TestCase("not unique", false)]
      [TestCase("uniqe", true)]
      [TestCase("", true)]
      public void AllUniqueStrings(string str, bool expectedResult)
      {
        var charSet = new bool[256];
        bool isUnique = true;
        for (int i = 0; i < str.Length; i++)
        {
          int index = str[i];
          if (index +1 > charSet.Length)
            Assert.Fail();

          if (charSet[index])
          {
            isUnique = false;
            break;
          }

          charSet[index] = true;
        }
        Assert.AreEqual(expectedResult, isUnique);
      }


      //Design an algorithm and write code to remove the duplicate characters in a string without 
      //using any additional buffer  NOTE: One or two additional variables are fine   
      //An extra copy of the array is not 
      //FOLLOW UP Write the test cases for this method 
      public void RemoveDuplicatesFromString(string str, string expectedResult)
      {
        
        var charSet = new bool[256];
      }
    }
}
