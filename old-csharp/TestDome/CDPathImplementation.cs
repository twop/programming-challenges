using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;

//http://www.testdome.com/Questions/Csharp/Path/647?testId=18&testDifficulty=Hard
//Write a function that provides change directory (cd) function for an abstract file system.

//Notes:
//- Root path is '/'.
//- Path separator is '/'.
//- Parent directory is addressable as "..".
//- Directory names consist only of English alphabet letters (A-Z and a-z).

//For example, new Path("/a/b/c/d").Cd("../x").CurrentPath should return "/a/b/c/x".


public class Path
{

    public string CurrentPath { get; private set; }


    public Path(string path)
    {
        this.CurrentPath = path;

    }

    public Path Cd(string newPath)
    {
        const string baseDirPattern = "..";
        const string slash = "/";

        if (string.IsNullOrEmpty(newPath))
            return this;

        //if we start with the slash that means that the path is absolute
        var stack = newPath.StartsWith(slash) ? new Stack<string>() :
            new Stack<string>(CurrentPath.Split(new[] { '/' }, StringSplitOptions.RemoveEmptyEntries));

        string[] split = newPath.Split(new[] { '/' }, StringSplitOptions.RemoveEmptyEntries);

        foreach (var element in split)
        {
            if (element == baseDirPattern)
            {
                if (stack.Count != 0)
                    stack.Pop();
            }
            else
            {
                stack.Push(element);
            }
        }

        if (stack.Count == 0)
            return new Path(slash);

        var builder = new StringBuilder();
        foreach (var element in new Stack<string>(stack))
        {
            builder.Append(slash);
            builder.Append(element);
        }

        return new Path(builder.ToString());
    }
}


public class PathTests
{
    [Test]
    public static void Normal()
    {
        Path path = new Path("/a/b/c/d");
        Assert.AreEqual("/a/b/c/x", path.Cd("../x").CurrentPath);
    }

    [Test]
    public static void Complex()
    {
        Path path = new Path("/a/b/c/d");
        Assert.AreEqual("/a/b/b", path.Cd("../j/../../b").CurrentPath);
    }


    [Test]
    public static void Empty()
    {
        Path path = new Path("/a/b/c/d");
        Assert.AreEqual(path.CurrentPath, path.Cd("").CurrentPath);
    }


    [Test]
    public static void Root()
    {
        Path path = new Path("/a/b/c/d");
        Assert.AreEqual("/", path.Cd("/..").CurrentPath);
    }


    [Test]
    public static void RootBaseDir()
    {
        Path path = new Path("/");
        Assert.AreEqual("/", path.Cd("..").CurrentPath);
    }

    [Test]
    public static void Edge2()
    {
        Path path = new Path("/a/b");
        Assert.AreEqual("/c", path.Cd("../../../../c").CurrentPath);
    }
}
