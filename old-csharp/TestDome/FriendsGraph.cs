using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;

//http://www.testdome.com/Questions/Csharp/Friends/1295?testId=21&testDifficulty=Hard
//Given a data structure representing a social network, write a function that finds friends of a certain degree. 
//Friends of the first degree are a member's immediate friends, friends of the second degree are friends of a member's friends excluding first degree friends, etc.

//For example, if A is a friend with B and B is a friend with C, then GetFriendsOfDegree(A, 2) 
//should return C since C is the only second degree friend of A (B is a first degree friend of A).

public class Member
{
    public string Email { get; private set; }

    public ICollection<Member> Friends { get; private set; }

    public Member(string email)
        : this(email, new List<Member>())
    {
    }

    public Member(string email, ICollection<Member> friends)
    {
        this.Email = email;
        this.Friends = friends;
    }

    public void AddFriends(ICollection<Member> friends)
    {
        foreach (Member friend in friends)
            this.Friends.Add(friend);
    }

    public void AddFriend(Member friend)
    {
        this.Friends.Add(friend);
    }
}

[TestFixture]
public class Friends
{
    private class QueueElement
    {
        public QueueElement(Member member, int degree)
        {
            Member = member;
            Degree = degree;
        }

        public Member Member { get; set; }
        public int Degree { get; set; }
    }

    public static List<Member> GetFriendsOfDegree(Member member, int degree)
    {
        var set = new HashSet<Member>() {member};
        var queue = new Queue<QueueElement>();
        queue.Enqueue(new QueueElement(member, 0));
        set.Add(member);

        var result = new List<Member>();

        while (queue.Count > 0)
        {
            var elem = queue.Dequeue();

            if (elem.Degree == degree)
                result.Add(elem.Member);

            if (elem.Degree < degree)
                foreach (var friend in elem.Member.Friends)
                {
                    if (set.Contains(friend))
                        continue;

                    set.Add(friend);
                    queue.Enqueue(new QueueElement(friend, elem.Degree + 1));
                }

        
        }

        return result;
    }


    public static List<Member> GetFriendsOfDegree2(Member member, int degree)
    {
        int level = 0;

        var set = new HashSet<Member> () { member };
        var lastLevel = new List<Member>() { member };

        while (true)
        {
            var thisLevel = new List<Member>();

            foreach (var friend in lastLevel.SelectMany(element => element.Friends.Where(f => !set.Contains(f))))
            {
                thisLevel.Add(friend);
                set.Add(friend);
            }

            if (thisLevel.Count == 0)
                break;

           lastLevel = thisLevel;
           level++;
           if (level == degree)
            return thisLevel;
        }

        //if nothing found return empty list
        return new List<Member>();
    }

    [Test]
    public static void Main()
    {
        Member a = new Member("A");
        Member b = new Member("B");
        Member c = new Member("C");

        a.AddFriend(b);
        b.AddFriend(c);

        Assert.AreSame(c, GetFriendsOfDegree(a, 2).Single());
        Assert.AreSame(c, GetFriendsOfDegree2(a, 2).Single());
    }

    [Test]
    public static void MutalFriend()
    {
        Member a = new Member("A");
        Member b = new Member("B");
        Member c = new Member("C");
        Member d = new Member("D");

        a.AddFriend(b);
        a.AddFriend(c);
        c.AddFriend(d);
        b.AddFriend(d);

        Assert.AreSame(d, GetFriendsOfDegree(a, 2).Single());
        Assert.AreSame(d, GetFriendsOfDegree2(a, 2).Single());
    }
}