import { MyLearningsCard } from "../Course/MyLearningsCard";
import { Course } from "@/types";
import { useEffect, useState } from "react";
import { fetchUserCourses } from "@/api/courseService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loader } from "../Loader";

export const MyCourses = () => {
  const [fetchedCourses, setFetchedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetchUserCourses();
        if (response.status !== 200) {
          throw new Error("Error fetching courses");
        }
        if (user.userInfo.role === "instructor" && response.data.data.courses) {
          setFetchedCourses(response.data.data.courses);
        } else if (
          user.userInfo.role === "student" &&
          response.data.data.EnrolledCourses
        ) {
          setFetchedCourses(response.data.data.EnrolledCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  console.log("FetchedCourses:", fetchedCourses);
  return (
    <article className="flex grow w-full flex-wrap gap-4 justify-around mt-10">
      {loading && (
        <div className="flex w-full h-96 items-center justify-center">
          <Loader />
        </div>
      )}
      {fetchedCourses?.map((course) => {
        return <MyLearningsCard key={course.id} course={course} />;
      })}
    </article>
  );
};
