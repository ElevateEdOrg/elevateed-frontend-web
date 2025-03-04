import {MyLearningsCard} from "../Course/MyLearningsCard"
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
        const response = await fetchUserCourses();
        if (response.status !== 200) {
          throw new Error("Error fetching courses");
        }
        setFetchedCourses(response.data.data.EnrolledCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <article className="flex grow w-full flex-wrap gap-4 justify-around mt-10">
      {fetchedCourses?.map((course) => {
       
        return <MyLearningsCard key={course.id} course={course} />
      }
      )}
    </article>
  );
};
