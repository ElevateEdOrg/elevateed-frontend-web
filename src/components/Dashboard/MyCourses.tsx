import { dummyCourses } from "@/../db";
import { CourseCard } from "../Course/CourseCard";

export const MyCourses = () => {
  return (
    <article className="flex grow w-full flex-wrap gap-4 justify-around mt-10">
      {dummyCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </article>
  );
};
