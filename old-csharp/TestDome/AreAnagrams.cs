using System.Collections.Generic;
using System.Linq;

using NUnit.Framework;


//http://www.testdome.com/Questions/Csharp/AreAnagrams/1291?testId=18&testDifficulty=Easy
//An anagram is a word formed from another by rearranging its letters, 
//using all the original letters exactly once; for example, orchestra can be rearranged into carthorse.
//Write a function that checks if two words are each other's anagrams.

//For example, AreStringsAnagrams("momdad", "dadmom") should return true as arguments are anagrams.

[TestFixture]
class AreAnagrams
{
    public static bool AreStringsAnagrams(string a, string b)
    {
        if (a.Length != b.Length)
            return false;

        var dict = new Dictionary<char, int>();

        for (int index = 0; index < b.Length; index++)
        {
            int count;
            dict.TryGetValue(a[index], out count);
            count++;
            dict[a[index]] = count;

            //this will reset count
            dict.TryGetValue(b[index], out count);
            count--;
            dict[b[index]] = count;
        }

        bool areStringsAnagrams = dict.All(pair => pair.Value == 0);
        return areStringsAnagrams;
    }

    [Test]
    public void Main()
    {
        Assert.True(AreAnagrams.AreStringsAnagrams("momdad", "dadmom"));
    }
}

