import React, { useEffect, useRef, useState } from "react";
import { CourseCard } from "./CourseCard";
import {
  fetchAllCategories,
  fetchAllCourses,
  FetchCategoriesResponse,
  FetchCoursesResponse,
} from "@/api/courseService";
import { Course } from "@/types";

export const BrowseCourses = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState("All Categories");
  const [fetchedCourses, setFetchedCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response: FetchCoursesResponse = await fetchAllCourses();
        const { data } = response;
        setFetchedCourses(data.data);
        setFilteredCourses(data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response: FetchCategoriesResponse = await fetchAllCategories();
        const { data } = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCourses();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (category === "All Categories") {
      setFilteredCourses(fetchedCourses);
      return;
    }
    setFilteredCourses(() =>
      fetchedCourses.filter((course) => course.Category?.name === category)
    );
  }, [category, fetchedCourses]);

  useEffect(() => {
    const handleWheelScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const handleCategoryWheelScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (categoryRef.current) {
        categoryRef.current.scrollLeft += e.deltaY;
      }
    };

    const courseContainer = scrollRef.current;
    const categoryContainer = categoryRef.current;

    if (courseContainer) {
      courseContainer.addEventListener("wheel", handleWheelScroll);
    }

    if (categoryContainer) {
      categoryContainer.addEventListener("wheel", handleCategoryWheelScroll);
    }

    return () => {
      if (courseContainer) {
        courseContainer.removeEventListener("wheel", handleWheelScroll);
      }
      if (categoryContainer) {
        categoryContainer.removeEventListener(
          "wheel",
          handleCategoryWheelScroll
        );
      }
    };
  }, []);

  return (
    <article>
      <h2 className="text-2xl font-bold border-b pb-4">Browse courses</h2>

      <div
        ref={categoryRef}
        className="flex gap-4 scrollbar-hidden py-4 w-full overflow-x-scroll"
      >
        <button
          onClick={() => setCategory("All Categories")}
          className="border border-black-30 text-black-90 px-2 py-1 rounded-md cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-all duration-200 h-fit whitespace-nowrap"
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCategory(category.name)}
            className="border border-black-30 text-black-90 px-2 py-1 rounded-md cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-all duration-200 h-fit whitespace-nowrap"
          >
            {category.name}
          </button>
        ))}
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-scroll w-full gap-4 py-4 scrollbar-hidden flex-nowrap"
      >
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </article>
  );
};
