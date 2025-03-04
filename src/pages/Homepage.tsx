import { useSelector } from "react-redux";
import {
  BrowseCourses,
  CourseCard,
  HeroBanner,
  PopularInstructors,
  RecommendedCourses,
} from "@/components";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { fetchUserCourses } from "@/api/courseService";
import { Course } from "@/types";
import { MyLearningsCard } from "@/components/Course/MyLearningsCard";

export const Homepage: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const [userCourses, setUserCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (state.user.userInfo.role !== "student") {
      return;
    }

    const fetchUserEnrolledCourses = async () => {
      try {
        const response = await fetchUserCourses();
        console.log("response", response);
        setUserCourses(response.data.data.EnrolledCourses);
      } catch (error) {
        console.log("Error fetching Courses", error);
      }
    };
    fetchUserEnrolledCourses();
  }, []);

  return (
    <section className="w-screen pt-24 px-4 xl:px-32 overflow-x-hidden">
      <article className="flex flex-col items-center w-full pb-10 ">
        <HeroBanner />
      </article>
      {state.user.userInfo.role === "student" && userCourses.length > 0 && (
        <article className="py-4">
          <h2 className="text-2xl font-bold border-b pb-4 ">
            Continue Watching
          </h2>
          <MyLearningsCard course={userCourses[0]} className="pt-4" />
        </article>
      )}
      <BrowseCourses />
      <RecommendedCourses />
      <PopularInstructors />
    </section>
  );
};
