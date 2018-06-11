using NUnit.Framework;


//http://www.testdome.com/Questions/Csharp/Palindrome/1299?testId=18&testDifficulty=Easy
//Write a function that checks if a given sentence is a palindrome. 
//A palindrome is a word, phrase, verse, or sentence that reads the same backward or forward. 
//Only the order of English alphabet letters (A-Z and a-z) should be considered, other characters should be ignored.

//For example, IsPalindrome("Noel sees Leon.") should return true as spaces, period, and case should be ignored 
//resulting with "noelseesleon" which is a palindrome since it reads same backward and forward.

class Palindrome
{
    public static bool IsPalindrome(string str)
    {
        if (str.Length <= 1)
            return true;

        int startIndex = 0;
        int endIndex = str.Length - 1;

        while (startIndex <= endIndex)
        {
            char start = str[startIndex];
            if (ShouldIgnore(start))
            {
                startIndex++;
                continue;
            }

            char end = str[endIndex];

            if (ShouldIgnore(end))
            {
                endIndex--;
                continue;
            }

            if (!AreEqual(end, start))
                return false;

            startIndex++;
            endIndex--;
        }

        return true;
    }

    private static bool ShouldIgnore(char c)
    {
        return !(c <= 'Z' && c >= 'A' || c <= 'z' && c >= 'a');
    }

    private static bool AreEqual(char a, char b)
    {
        return char.ToLower(a) == char.ToLower(b);
    }

}

[TestFixture]
public class PalindromeTests
{
    [TestCase("Noel%% sees 43213Leon.", true)]
    [TestCase("s.....ES         ..", true)]
    [TestCase("Noel     .... sees Leon.", true)]
    public void Main(string str, bool expectedResult)
    {
        Assert.AreEqual(expectedResult, Palindrome.IsPalindrome(str));
    }



}

