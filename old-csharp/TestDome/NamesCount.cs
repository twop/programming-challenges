using System.Collections.Generic;
using NUnit.Framework;


//http://www.testdome.com/Questions/Csharp/NamesCount/1344?testId=18&testDifficulty=Easy
//NamesCount is a component for analysing the proportion of names in a set of names.

//For example:
//NamesCount namesCount = new NamesCount();
//namesCount.AddName("James");
//namesCount.AddName("John");
//namesCount.AddName("Mary");
//namesCount.AddName("Mary");

//Running namesCount.NameProportion("John") should return 0.25.
//And running namesCount.NameProportion("Mary") should return 0.5.

//Fix the bugs.

public class NamesCount
{
    private int count;
    private Dictionary<string, int> counts = new Dictionary<string, int>();

    /// <summary>
    /// Adds the name.
    /// </summary>
    /// <param name="name">Name.</param>
    public void AddName(string name)
    {
        int nameCount;
        counts.TryGetValue(name, out nameCount);

        nameCount++;
        counts[name] = nameCount;

        count++;
    }

    /// <summary>
    /// Returns proportion of parameter name in all calls to AddName.
    /// </summary>
    /// <returns>Double in interval [0, 1]. Returns 0 if AddName has not been called.</returns>
    /// <param name="name">Name.</param>
    public double NameProportion(string name)
    {
        int nameCount;
        if (!counts.TryGetValue(name, out nameCount))
            return 0;

        return ((double)nameCount) / count;
    }
}

[TestFixture]
class NamesCountTests
{
    [Test]
    public static void Main()
    {
        NamesCount namesCount = new NamesCount();

        namesCount.AddName("James");
        namesCount.AddName("John");
        namesCount.AddName("Mary");
        namesCount.AddName("Mary");

        Assert.AreEqual(0.25, namesCount.NameProportion("John"));
        Assert.AreEqual(0.5, namesCount.NameProportion("Mary"));
        //Console.WriteLine("Fraction of Johns: {0}", namesCount.NameProportion("John"));
        //Console.WriteLine("Fraction of Marys: {0}", namesCount.NameProportion("Mary"));
    }
}
     

