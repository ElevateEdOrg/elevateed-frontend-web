import { CourseCard } from "../Course/CourseCard";
import { Course } from "@/types";
import { useEffect, useState } from "react";
import {
  fetchUserCourses,
  FetchUserCoursesResponse,
} from "@/api/courseService";

export const MyCourses = () => {
  const [fetchedCourses, setFetchedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response: FetchUserCoursesResponse = await fetchUserCourses();
        if (response.status !== 200) {
          throw new Error("Error fetching courses");
        }
        const { data } = response.data;
        setFetchedCourses(data.EnrolledCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <article className="flex grow w-full flex-wrap gap-4 justify-around mt-10">
      {fetchedCourses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </article>
  );
};
