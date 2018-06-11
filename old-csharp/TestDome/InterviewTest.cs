using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using System;
using System.Collections.Generic;
using NUnit.Framework;

[TestFixture]
public class Problem
{
    public static List<int> CollateSortedLists(List<int> l1, List<int> l2)
    {
        if (l1 == null && l2 ==null)
            return new List<int>(0);

        //if any of those is null return the other one
        if (l1 == null)
            return l2;

        if (l2 == null)
            return l1;

        //we can probably do better resizing the biggest one
        //but it will allocate the same amount anyway. 
        // + its not clear wether we should keep the initials
        var result = new List<int>(l1.Count + l1.Count);
        int index1 = 0;
        int index2 = 0;

        while (index1 <= l1.Count - 1 || index2 <= l2.Count - 1)
        {
            int elem = TakeSmallestElement(l1, ref index1, l2, ref index2);
            result.Add(elem);
        }

        return result;
    }

    /// <summary>
    /// take the smallest element and move merge index in the affected array
    /// </summary>
    /// <param name="l1"></param>
    /// <param name="index1"></param>
    /// <param name="l2"></param>
    /// <param name="index2"></param>
    /// <returns></returns>
    private static int TakeSmallestElement(List<int> l1, ref int index1, List<int> l2, ref int index2)
    {
        if (index1 > l1.Count - 1)
        {
            index2++;
            return l2[index2-1];
        }

        if (index2 > l2.Count - 1)
        {
            index1++;
            return l1[index1-1];
        }

        //avoid double indexing
        int elem1 = l1[index1];
        int elem2 = l2[index2];

        if (elem1 < elem2)
        {
            index1++;
            return elem1;
        }

        index2++;
        return elem2;
    }

    [Test]
    public void Test()
    {
        var l1 = new List<int> {0,2,3};
        var l2 = new List<int> { 1, 3, 4, 5 };
        var result = new List<int> { 0, 1, 2, 3, 3, 4, 5 };

        CollectionAssert.AreEqual(result, CollateSortedLists(l1, l2));
    }
}