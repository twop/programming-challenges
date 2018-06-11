using System.Collections.Generic;
using NUnit.Framework;


//http://www.testdome.com/Questions/Csharp/Frog/660?testId=21&testDifficulty=Easy
//A frog only moves forward, but it can move in steps 1 inch long or in jumps 2 inches long.
//A frog can cover the same distance using different combinations of steps and jumps. 
//Write a function that calculates the number of different combinations a frog can use to cover a given distance.

//For example, a distance of 3 inches can be covered in three ways: step-step-step, step-jump, and jump-step.

[TestFixture]
class FrogJumps
{
    private const int SmallJump = 1;
    private const int BigJump = 2;
    public static int NumberOfWays(int n)
    {
        //TODO can we do better than dictionary?
        var dict = new Dictionary<int, int>();
        return NumberOfWaysInternal(n, dict);
    }

    private static int NumberOfWaysInternal(int n, Dictionary<int, int> dict)
    {
        if (n < SmallJump)
            return 0;

        if (n == SmallJump)
            return 1;

        if (n == BigJump)
            return 1 + 1; //can be covered by a big step + all smaller steps

        //only small jumps will do
        if (n < BigJump)
            return 1;

        int numOfWays;
        if (dict.TryGetValue(n, out numOfWays))
            return numOfWays;

        numOfWays = NumberOfWaysInternal(n - SmallJump, dict) + NumberOfWaysInternal(n - BigJump, dict);
        dict[n] = numOfWays;
        return numOfWays;
    }

    public static int Fibonacci(int n)
    {
        int a = SmallJump;
        int b = BigJump;
        // In N steps compute Fibonacci sequence iteratively.
        for (int i = 1; i < n; i++)
        {
            int temp = a;
            a = b;
            b = temp + b;
        }
        return a;
    }



    [Test]
    public static void Main()
    {
        //Assert.AreEqual(3,NumberOfWays(3));

        //Assert.AreEqual(3, Fibonacci(3));

        const int n = 3;
        Assert.AreEqual(Fibonacci(n), NumberOfWays(n));

        //Assert.AreEqual(100500, NumberOfWays(10));
    }
}
