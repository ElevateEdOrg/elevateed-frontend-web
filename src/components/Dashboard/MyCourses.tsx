import { MyLearningsCard } from "../Course/MyLearningsCard";
import { Course } from "@/types";
import { useEffect, useState } from "react";
import {
  fetchUserCourses,
  FetchUserCoursesResponse,
} from "@/api/courseService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const MyCourses = () => {
  const [fetchedCourses, setFetchedCourses] = useState<Course[]>([]);
  const { user } = useSelector((state: RootState) => state);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchUserCourses();
        if (response.status !== 200) {
          throw new Error("Error fetching courses");
        }
        if (user.userInfo.role === "instructor") {
          setFetchedCourses(response.data.data.courses);
        } else {
          setFetchedCourses(response.data.data.EnrolledCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <article className="flex grow w-full flex-wrap gap-4 justify-around mt-10">
      {fetchedCourses?.map((course) => {
        return <MyLearningsCard key={course.id} course={course} />;
      })}
    </article>
  );
};
