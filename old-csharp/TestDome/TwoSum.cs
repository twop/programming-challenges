using System;
using System.Collections.Generic;
using NUnit.Framework;


//http://www.testdome.com/Questions/Csharp/TwoSum/908?testId=21&testDifficulty=Easy
//Write a function that, given a list and a target sum, 
//returns zero-based indices of any two distinct elements whose sum is equal to the target sum.
//If there are no such elements, the function should return null.

//For example, FindTwoSum(new List<int>() { 1, 3, 5, 7, 9 }, 12) should return any of the following tuples of indices:
//- 1, 4 (3 + 9 = 12),
//- 2, 3 (5 + 7 = 12),
//- 3, 2 (7 + 5 = 12) or
//- 4, 1 (9 + 3 = 12).

[TestFixture]
class TwoSum
{
    public static Tuple<int, int> FindTwoSum(IList<int> list, int sum)
    {
        var dict = new Dictionary<int, int>();
        for (int i = 0; i < list.Count; i++)
        {
            dict[list[i]] = i;
        }

        for (int i = 0; i < list.Count; i++)
        {
            int sumLeft = sum - list[i];
            int leftIndex;
            if (dict.TryGetValue(sumLeft, out leftIndex))
                return new Tuple<int, int>(i, leftIndex);
        }

        return null;
    }

    //TODO write tests
    [Test]
    public static void Main()
    {
        Tuple<int, int> indices = TwoSum.FindTwoSum(new List<int>() { 1, 3, 5, 7, 9 }, 12);
        Console.WriteLine(indices.Item1 + " " + indices.Item2);
    }
}

