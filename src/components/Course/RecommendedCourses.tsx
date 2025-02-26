import React, { useRef, useState, useEffect } from "react";
import { CourseCard } from "./CourseCard";
import { dummyCourses } from "@/../db";
import { FaChevronDown, FaRupeeSign } from "react-icons/fa";

export const RecommendedCourses = () => {
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
              src={
                dummyCourses[0].banner_image ||
                "./src/assets/courseBanners/banner1.png"
              }
              alt={`Banner Image of ${dummyCourses[0].title}`}
              draggable={false}
            />
          </div>
          <div className="mt-10">
            <h3 className="line-clamp-2 font-bold uppercase mt-2 lg:text-2xl">
              {dummyCourses[0].title}
            </h3>
            <div className="flex justify-between">
              <div className="flex gap-2 px-1">
                <img src="/personIcon.svg" alt="" />
                <p className="text-sm text-brand-primary">
                  {dummyCourses[0].Instructor?.full_name}
                </p>
              </div>
              <div className="flex gap-2 px-4 bg-brand-primary rounded-full">
                <p className="text-sm text-white">
                  {dummyCourses[0].Category?.name}
                </p>
              </div>
            </div>
            {dummyCourses[0].description && (
              <p className="line-clamp-3 tracking-wide">
                {dummyCourses[0].description}
              </p>
            )}
            {dummyCourses[0].price && (
              <p className="flex gap-1 items-center font-bold text-lg">
                <FaRupeeSign />
                {dummyCourses[0].price}
              </p>
            )}
          </div>
        </article>
        {/* Course Sidebar */}
        <div className="flex gap-4 grow flex-wrap justify-around overflow-y-auto h-[500px] lg:h-[700px]">
          {dummyCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </article>
  );
};
