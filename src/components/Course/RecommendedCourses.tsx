import { useState, useEffect } from "react";
import { CourseCard } from "./CourseCard";
import { dummyCourses } from "@/../db";
import { FaRupeeSign } from "react-icons/fa";
import { DefaultCourseBanner1, personIcon } from "@/assets";
import {
  fetchAllCourses,
  fetchRecommendedCourses,
} from "../../api/courseService";

import { Course } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loader } from "../Loader";
export const RecommendedCourses = () => {
  const [loading, setLoading] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[] | null>(
    null
  );
  const { user } = useSelector((state: RootState) => state);
  useEffect(() => {
    const fetchAICourses = async () => {
      setLoading(true);
      try {
        const response = await fetchRecommendedCourses();
        if (response?.data?.data) {
          setRecommendedCourses(response.data.data);
        } else {
          setRecommendedCourses([]);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
        setRecommendedCourses([]);
      } finally {
        setLoading(false);
      }
    };
    const fetchNonAICourses = async () => {
      setLoading(true);
      try {
        const response = await fetchAllCourses();
        if (response?.data?.data) {
          setRecommendedCourses(response.data.data);
        } else {
          setRecommendedCourses([]);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
        setRecommendedCourses([]);
      } finally {
        setLoading(false);
      }
    };

    if (user.isLoggedIn) {
      fetchAICourses();
    } else {
      fetchNonAICourses();
    }
  }, [user.isLoggedIn]);

  if (!recommendedCourses || loading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <Loader />
      </div>
    );
  }
  return (
    <article>
      <h2 className="text-2xl font-bold border-b pb-4">Top picks for you</h2>

      <div className="flex flex-col lg:flex-row items-center w-full gap-10 py-4">
        {/* First big course card */}
        <article className="lg:w-1/2 w-80 flex-shrink-0">
          {/* Image */}
          <div className="w-full aspect-video rounded-4xl overflow-hidden">
            <img
              className="w-full h-full"
              src={recommendedCourses[0].banner_image || DefaultCourseBanner1}
              alt={`Banner Image of ${recommendedCourses[0].title}`}
              draggable={false}
            />
          </div>
          <div className="mt-10">
            <h3 className="line-clamp-2 font-bold uppercase mt-2 lg:text-2xl">
              {recommendedCourses[0].title}
            </h3>
            <div className="flex justify-between">
              <div className="flex gap-2 px-1">
                <img src={personIcon} alt="" />
                <p className="text-sm text-brand-primary">
                  {recommendedCourses[0].Instructor?.full_name}
                </p>
              </div>
              <div className="flex gap-2 px-4 bg-brand-primary rounded-full">
                <p className="text-sm text-white">
                  {recommendedCourses[0].Category?.name}
                </p>
              </div>
            </div>
            {recommendedCourses[0].description && (
              <p className="line-clamp-3 tracking-wide">
                {recommendedCourses[0].description}
              </p>
            )}
            {recommendedCourses[0].price && (
              <p className="flex gap-1 items-center font-bold text-lg">
                <FaRupeeSign />
                {recommendedCourses[0].price}
              </p>
            )}
          </div>
        </article>
        {/* Course Sidebar */}
        <div className="flex gap-4 grow flex-wrap justify-around overflow-y-auto h-[500px] lg:h-[700px]">
          {recommendedCourses
            .slice(1, recommendedCourses.length - 1)
            .map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>
      </div>
    </article>
  );
};
