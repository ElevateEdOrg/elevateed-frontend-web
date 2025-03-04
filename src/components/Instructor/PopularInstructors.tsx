import { DefaultInstructorImg } from "@/assets";
import React, { useState, useEffect } from "react";
import { fetchTopInstructors, Instructors } from "../../api/courseService";

export const PopularInstructors = () => {
  const [loading, setLoading] = useState(true);
  const [topInstructors, setTopInstructors] = useState<Instructors[] | null>(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      setLoading(true);
      try {
        const response = await fetchTopInstructors();
        if (response?.data?.data) {
          setTopInstructors(response.data.data);
        } else {
          setTopInstructors([]);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
        setTopInstructors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) {
    return (
      <h1 className="pt-24 h-screen flex justify-center items-center text-4xl">
        Loading...
      </h1>
    );
  }

  if (!topInstructors || topInstructors.length === 0) {
    return (
      <h1 className="pt-24 h-screen flex justify-center items-center text-2xl">
        No instructors found.
      </h1>
    );
  }

  return (
    <article className="py-4">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Popular Instructors</h2>
        <p className="font-thin mt-4">Instructors who know what they are doing!</p>
      </div>
      <div className="mt-6 grid gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {topInstructors.map((instructor) => (
          <div key={instructor.id} className="rounded-3xl overflow-hidden relative group">
            {/* Hover Effect */}
            <div className="absolute flex items-end bottom-[-100%] group-hover:bottom-0 left-0 bg-gradient-to-b from-transparent to-black-90 w-full h-full transition-all duration-300">
              <div className="flex flex-col items-center justify-center text-white h-1/2 w-full px-4">
                <h3 className="text-lg font-bold border-b w-full text-center">{instructor.full_name}</h3>
                <p className="text-sm">{instructor.total_courses} courses - {instructor.total_enrollments} students</p>
              </div>
            </div>
            {/* Instructor Image */}
            <img
              src={instructor.avatar || DefaultInstructorImg}
              alt={instructor.full_name}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </article>
  );
};
