// There are a total of n courses you have to take, labeled from 0 to n-1.

// Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

// Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

// Example 1:

// Input: 2, [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take.
//              To take course 1 you should have finished course 0. So it is possible.

// Example 2:

// Input: 2, [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
//              To take course 1 you should have finished course 0, and to take course 0 you should
//              also have finished course 1. So it is impossible.

// Note:

//     The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
//     You may assume that there are no duplicate edges in the input prerequisites.

namespace CourseShedule {
  // Kahn's algorithm
  // https://en.wikipedia.org/wiki/Topological_sorting#Algorithms

  // [toTake, required]
  type Prerequisite = [number, number];

  type Course = {
    num: number;
    dependsOn: Set<number>;
    unlocks: Set<number>;
  };

  type Courses = Map<number, Course>;

  const removeCourse = (
    num: number,
    courses: Courses
  ): Set<number> | undefined => {
    const toDelete = courses.get(num);
    if (toDelete) {
      courses.delete(num);
      toDelete.unlocks.forEach(c => {
        const courseDeps = courses.get(c);
        if (courseDeps) {
          courseDeps.dependsOn.delete(num);
        }
      });
    }

    return toDelete && toDelete.unlocks;
  };

  const getOrCreate = (num: number, courses: Courses): Course => {
    const course = courses.get(num) || {
      num,
      dependsOn: new Set<number>(),
      unlocks: new Set<number>()
    };

    courses.set(num, course);

    return course;
  };

  const addEdge = (
    courses: Courses,
    prerequisite: number,
    toCourse: number
  ): Courses => {
    getOrCreate(prerequisite, courses).unlocks.add(toCourse);
    getOrCreate(toCourse, courses).dependsOn.add(prerequisite);

    return courses;
  };

  const buildCourses = (prerequisites: Prerequisite[]): Courses =>
    prerequisites.reduce<Courses>(
      (courses, [toTake, pre]) => addEdge(courses, pre, toTake),
      new Map<number, Course>()
    );

  const hasDependency = (courses: Courses, courseNum: number): boolean => {
    const course = courses.get(courseNum);
    return course ? course.dependsOn.size > 0 : false;
  };

  const canFinish = (
    numCourses: number,
    prerequisites: Prerequisite[]
  ): boolean => {
    const courses = buildCourses(prerequisites);

    const ready = new Set<number>(
      new Array(numCourses)
        .fill(0)
        .map((_, i) => i)
        .filter(c => !hasDependency(courses, c))
    );

    while (ready.size > 0) {
      const course = ready.values().next().value;
      const toTry = removeCourse(course, courses);
      if (toTry === undefined) {
        continue;
      }

      toTry.forEach(c => {
        if (!hasDependency(courses, c)) {
          ready.add(c);
        }
      });

      ready.delete(course);
    }

    return courses.size === 0;
  };

  console.log(canFinish(2, [[1, 0]]));
}
