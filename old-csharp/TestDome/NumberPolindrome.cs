using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//http://www.geeksforgeeks.org/check-if-a-number-is-palindrome/
//Given an integer, write a function that returns true if the given number is palindrome, else false. For example, 12321 is palindrome, but 1451 is not palindrome.
using NUnit.Framework;

[TestFixture]
class NumberPolindrome
{
    [TestCase(1, Result = true)]
    [TestCase(12, Result = false)]
    [TestCase(12321, Result = true)]
    [TestCase(1451, Result = false)]
    public static bool IsPolindrome(int number)
    {
        return IsPolindromeList(number);
    }


    [TestCase(1, Result = true)]
    [TestCase(12, Result = false)]
    [TestCase(12321, Result = true)]
    [TestCase(1451, Result = false)]
    public static bool IsPolindromeRecursion(int number)
    {
        if (number == 0)
            return true;

        int copy = number;
        int multiplier = 1;
        int invertedNumber = Invert(ref copy, ref multiplier);
        return invertedNumber == number;
    }

    private static int Invert(ref int refNumber, ref int multiplier)
    {
        if (refNumber > 0 && refNumber < 10)
        {
            return refNumber;
        }

        int digit = refNumber%10;
        refNumber = refNumber/10;
        int inverted = Invert(ref refNumber, ref multiplier);
        multiplier *= 10;
        return inverted + multiplier * digit;
    }

    [TestCase(1, Result = true)]
    [TestCase(12, Result = false)]
    [TestCase(12321, Result = true)]
    [TestCase(1451, Result = false)]
    public static bool IsPolindromeLoop(int number)
    {
        if (number == 0)
            return true;

        int initial = number;
        int inverted = 0;

        while (number>0)
        {
            int digit = number % 10;
            number = number / 10;
            inverted *= 10;
            inverted += digit;
        }

        return initial == inverted;
    }

    private static bool IsPolindromeList(int number)
    {
        var digits = new List<int>();

        while (number > 0)
        {
            int lastDigit = number%10;
            number = number/10;
            digits.Add(lastDigit);
        }

        for (int i = 0, j = digits.Count - 1; i < j; i++, j--)
        {
            if (digits[i] != digits[j])
                return false;
        }

        return true;
    }
}

