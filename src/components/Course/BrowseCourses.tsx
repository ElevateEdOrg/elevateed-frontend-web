import React from "react";
import { CourseCard } from "./CourseCard";
import { dummyCategories, dummyCourses } from "@/../db";

export const BrowseCourses = () => {
  return (
    <article>
      <h2 className="text-2xl font-bold border-b pb-4 ">Browse courses</h2>
      <div className="flex gap-4 scrollbar-hidden py-4 w-screen overflow-scroll">
        <button className="border border-black-30 text-black-90 px-2 py-1 rounded-md cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-all duration-200 h-fit whitespace-nowrap">
          All Categories
        </button>
        {dummyCategories.map((category) => {
          return (
            <button
              key={category.id}
              className="border border-black-30 text-black-90 px-2 py-1 rounded-md cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-all duration-200 h-fit whitespace-nowrap"
            >
              {category.name}
            </button>
          );
        })}
      </div>
      <div className="flex overflow-scroll w-screen gap-4 py-4 scrollbar-hidden flex-nowrap">
        {dummyCourses.map((course) => {
          return <CourseCard key={course.id} course={course} />;
        })}
      </div>
    </article>
  );
};
