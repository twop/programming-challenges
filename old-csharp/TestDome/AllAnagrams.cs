using System;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;

//http://www.testdome.com/Questions/Csharp/AllAnagrams/1308?testId=21&testDifficulty=Hard
//An anagram is a word formed from another by rearranging its letters, using all the original letters exactly once; 
//for example, orchestra can be rearranged into carthorse.
//Write a function which returns all anagrams of a given word (including the word itself) in any order.

//For example GetAllAnagrams("abba") should return collection containing "aabb", "abab", "abba", "baab", "baba", "bbaa".

[TestFixture]
public class AllAnagrams
{
    public static ICollection<string> GetAllAnagrams(string str)
    {
        var result = new HashSet<string>();

        if (string.IsNullOrEmpty(str))
        {
            return result;
        }

        if (str.Length == 1)
        {
            result.Add(str);
            return result;
        }
        
        var prevAnagrams = GetAllAnagrams(str.Substring(1, str.Length - 1));

        var subString = str.Substring(0,1);
        foreach (string anagram in prevAnagrams)
        {
            for (int i = 0; i < anagram.Length; i++)
            {
                result.Add(anagram.Insert(i, subString));
            }

            result.Add(anagram + subString);
        }

        return result.ToList();
    }

    [Test]
    public static void Main()
    {
        ICollection<string> anagrams = GetAllAnagrams("abba");
        //foreach (string a in anagrams)
        //    Console.WriteLine(a);

        var expectedResult = new List<string>() {"aabb", "abab", "abba", "baab", "baba", "bbaa"};

        foreach (string a in expectedResult.Except(anagrams))
            Console.WriteLine(a);


        CollectionAssert.AreEquivalent(expectedResult, anagrams);
    }

    [Test]
    public static void Simple()
    {
        ICollection<string> anagrams = GetAllAnagrams("ab");
        //foreach (string a in anagrams)
        //    Console.WriteLine(a);

        var expectedResult = new List<string>() { "ab", "ba"};

        foreach (string a in expectedResult.Except(anagrams))
            Console.WriteLine(a);


        CollectionAssert.AreEquivalent(expectedResult, anagrams);


    }
}