using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;

public class Problem2
{
    //Write a function that takes a list of integers and returns the maximum product that can be derived from any three integers in the list.
    //An ArgumentException is thrown for any input that will not produce a valid Int32 product. 
    //For the sample input [1 0, 3, 0, -2, 12, 5, 1, 1, 4] 
    //The expected result is the product of 10, 12, and 5: 10*12*5 = 600

    private class MaxHeap
    {
        private readonly int _size;
        private readonly List<int> _list;
        private int _minIndex = -1;
        public MaxHeap(int size)
        {
            _size = size;
            _list = new List<int>(size);
        }

        public void Add(int element)
        {
            if (_list.Count < _size)
            {
                _list.Add(element);
                return;
            }

            if (_minIndex < 0)
            {
                _minIndex = 0;
                int min = _list[0];

                for (int i = 0; i < _list.Count; i++)
                {
                    if (min > _list[i])
                        _minIndex = i;
                }
            }

            if (_list[_minIndex] < element)
            {
                _list[_minIndex] = element;
                _minIndex = -1;//reset index
            }
        }

        public List<int> List { get { return _list; } }
    }

    private const int NegativeListSize = 2;
    private const int MaximumListSize = 3;
    public static int MaxThreeProduct(List<int> input)
    {
        if (input == null || input.Count < MaximumListSize)
        throw new ArgumentException();

        var maxHeap = new MaxHeap(MaximumListSize);
        var negativeHeap = new MaxHeap(NegativeListSize);

        for (int i = 0; i < input.Count; i++)
        {
            int elem = input[i];
            maxHeap.Add(elem);

            if (elem<0)
                negativeHeap.Add( Math.Abs(elem));
        }

        if (!IsValid(maxHeap.List) || !IsValid(negativeHeap.List))
            throw new ArgumentException();

        List<int> result = MergeResults(maxHeap.List, negativeHeap.List);

        if (!IsValid(result))
            throw new ArgumentException();

        return result.Aggregate(1, (current, i) => current * i);
    }

    private static List<int> MergeResults(List<int> maximumList, List<int> negativeList)
    {
        int negativeCount = maximumList.Count(t => t < 0);
        //nothing to do here
        if (negativeCount == maximumList.Count || negativeList.Count < NegativeListSize)
            return maximumList;

        //means that we can replace with min negatives
        if ( negativeCount>0 && negativeCount <= NegativeListSize)
        {
            //need to take all from negative and remove all smaller elements from the list
            return ReplaceWithNegatives(maximumList, negativeList);
        }

        //means zero negatives
        int positiveProduct = maximumList.Except(new[] { maximumList.Max()}).Aggregate(1, (current, i) => current * i);
        int negativeProduct = negativeList.Aggregate(1, (current, i) => current * i);
        
        if (positiveProduct < negativeProduct)
            return ReplaceWithNegatives(maximumList, negativeList);

        return maximumList;
    }

    private static List<int> ReplaceWithNegatives(List<int> maximumList, List<int> negativeList)
    {
        for (int i = 0; i < NegativeListSize; i++)
        {
            maximumList.Remove(maximumList.Min());
        }

        maximumList.AddRange(negativeList);
        return maximumList;
    }

    private static bool IsValid(List<int> list)
    {
        int testResult = int.MaxValue;

        for (int i = 0; i < list.Count; i++)
        {
            //skip zero
            if (list[i] == 0)
                continue;

            testResult = testResult/list[i];
        }

        //if we have more than zero we are fine
        return Math.Abs(testResult) > 0;
    }

    [Test]
    public void TestNormal()
    {
        var input = new List<int> { 0, 1, 2, 3, 3, 4, 5 };
        Assert.AreEqual(5*4*3, MaxThreeProduct(input));
    }

    [Test]
    public void TestAllNegatives()
    {
        var input = new List<int> {  -2, -3, -4, -5 };

        Assert.AreEqual( - 2* 3 * 4, MaxThreeProduct(input));
    }


    [Test]
    public void TestOneNegative()
    {
        var input = new List<int> { 3, 2, -1, -4, -5 };
        Assert.AreEqual( 3 * 4 * 5, MaxThreeProduct(input));
    }

    [Test]
    public void TestTwoNegatives()
    {
        var input = new List<int> { 3, -3, -1, -4, -5 };
        Assert.AreEqual(3 * 4 * 5, MaxThreeProduct(input));
    }

    [Test]
    public void TestZeroNegativesButNegativeProductBigger()
    {
        var input = new List<int> { 3, 3, 1, -4, -5 };
        Assert.AreEqual(3 * 4 * 5, MaxThreeProduct(input));
    }

    [Test]
    public void TestZeroNegativesButPositiveProductBigger()
    {
        var input = new List<int> { 6, 10, 5, -4, -5 };
        Assert.AreEqual(6 * 10 * 5, MaxThreeProduct(input));
    }

    [Test]
    public void TestZeroNegatives1237521735281753781()
    {
        var input = new List<int> { 6, 10, -1, -1, 0, 0 };
        Assert.AreEqual(10 *- 1 *- 1, MaxThreeProduct(input));
    }
}