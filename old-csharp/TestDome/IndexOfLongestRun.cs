using NUnit.Framework;


public class Run
{
    //http://www.testdome.com/Questions/Csharp/Run/1324?testId=18&testDifficulty=Hard
    //Write a function that finds the zero-based index of the longest run in a string.
    //A run is a consecutive sequence of the same character. If there is more than one run with the same length, return the index of the first one.

    //For example, IndexOfLongestRun("abbcccddddcccbba") should return 6 as the longest run is dddd and it first appears on index 6.

    public static int IndexOfLongestRun(string str)
    {
        if (string.IsNullOrEmpty(str))
            return 0;

        int longestRun = 0;
        int runIndex = 0;

        for (int i = 0; i < str.Length;)
        {
            int runLen = GetRunLen(str, i);
            if (runLen > longestRun)
            {
                longestRun = runLen;
                runIndex = i;
            }
            i += runLen;
        }

        return runIndex;
    }

    private static int GetRunLen(string str, int startIndex)
    {
        int index = startIndex+1;
        while (index < str.Length)
        {
            if (str[startIndex] != str[index])
                break;

            index++;
        }
        return index - startIndex;
    }   

    public static int IndexOfLongestRunBad(string str)
    {
        if (string.IsNullOrEmpty(str))
            return 0;

        int[] runs = new int[256];//ASCII
        int[] startIndexes = new int[256];//ASCII

        char currentChar = str[0];
        runs[(int)currentChar] = 1;
        startIndexes[(int)currentChar] = 0;
        int currentLen = 1;

        for (int i = 1; i < str.Length; i++)
        {
            var c = str[i];
            if (c != currentChar)
            {
                if (runs[currentChar] < currentLen)
                {
                    runs[currentChar] = currentLen;
                    startIndexes[(int)currentChar] = i - currentLen;
                }

                currentLen = 1; //start from the begining
            }
            else
            {
                //increment run len
                currentLen++;
            }
            currentChar = c;
        }

        int longestRun = -1;
        int index = -1;

        for (int i = 0; i < runs.Length; i++)
        {
            if (longestRun < runs[i])//|| longestRun == runs[i] && startIndexes[index] > startIndexes[i])
            {
                longestRun = runs[i];
                index = i;
            }
        }

        return startIndexes[index];
    }

    [Test]
    public static void Main()
    {
        Assert.AreEqual(6, IndexOfLongestRun("abbcccddddcccbba"));
    }

    [Test]
    public static void Main1()
    {
        Assert.AreEqual(0, IndexOfLongestRun("bbbaaa"));
    }
}

