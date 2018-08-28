// https://leetcode.com/problems/course-schedule-ii/description/

// There are a total of n courses you have to take, labeled from 0 to n-1.

// Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

// Given the total number of courses and a list of prerequisite pairs, return the ordering of courses you should take to finish all courses.

// There may be multiple correct orders, you just need to return one of them. If it is impossible to finish all courses, return an empty array.

// Example 1:

// Input: 2, [[1,0]]
// Output: [0,1]
// Explanation: There are a total of 2 courses to take. To take course 1 you should have finished
//              course 0. So the correct course order is [0,1] .

// Example 2:

// Input: 4, [[1,0],[2,0],[3,1],[3,2]]
// Output: [0,1,2,3] or [0,2,1,3]
// Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both
//              courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
//              So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3] .

namespace CourseShedule2 {
  type Prerequisite = [number, number];
  type CourseMap = Map<number, Set<number>>;
  type Comp = { res: boolean; seq: Set<number> };
  const findOrder = (
    numCourses: number,
    prerequisites: Prerequisite[]
  ): number[] => {
    const courseMap = prerequisites.reduce<CourseMap>(
      (m, [toTake, required]) =>
        m.set(toTake, (m.get(toTake) || new Set<number>()).add(required)),
      new Array(numCourses)
        .fill(0)
        .map((_0, i) => i)
        .reduce<CourseMap>(
          (m, c) => m.set(c, new Set<number>()),
          new Map<number, Set<number>>()
        )
    );

    return Array.from(
      Array.from(courseMap.keys()).reduce<Comp>(
        aggregate(courseMap, new Set<number>()),
        { res: true, seq: new Set<number>() }
      ).seq
    );
  };

  const aggregate = (courseMap: CourseMap, pending: Set<number>) => (
    { res, seq }: Comp,
    course: number
  ) =>
    res
      ? seq.has(course)
        ? { res, seq }
        : completeCourse(course, courseMap, pending, seq)
      : { res: false, seq: new Set<number>() };

  const completeCourse = (
    course: number,
    m: CourseMap,
    pending: Set<number>,
    seq: Set<number>
  ): Comp => {
    const deps = m.get(course);
    if (!deps) {
      return { res: true, seq: seq.add(course) };
    }

    if (pending.has(course)) {
      return { res: false, seq };
    }

    pending.add(course);

    const { res, seq: s } = Array.from(deps.values()).reduce<Comp>(
      aggregate(m, pending),
      { res: true, seq }
    );

    pending.delete(course);
    m.delete(course);

    return { res, seq: s.add(course) };
  };
}
