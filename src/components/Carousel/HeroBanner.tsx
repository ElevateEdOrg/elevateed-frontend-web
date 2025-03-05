import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Assuming you have API functions
import { fetchAllCourses, FetchCoursesResponse } from "@/api/courseService"; // Update with actual API path
import { Course } from "@/types";
import { DefaultCourseBanner1 } from "@/assets";

export function HeroBanner() {
  const [topCourses, setTopCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse: FetchCoursesResponse = await fetchAllCourses();
        const courses = courseResponse.data.data;

        // Find highest-rated course per category
        const topCoursesMap = new Map<string, Course>();

        courses.forEach((course) => {
          const categoryId = course.Category.id;
          if (
            !topCoursesMap.has(categoryId) ||
            course.avg_rating > topCoursesMap.get(categoryId)!.avg_rating
          ) {
            topCoursesMap.set(categoryId, course);
          }
        });

        setTopCourses(Array.from(topCoursesMap.values()));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  return (
    <Carousel className="w-full select-none">
      <CarouselContent>
        {topCourses.length > 0 ? (
          topCourses.map((course) => (
            <CarouselItem key={course.id}>
              <div className="flex flex-col-reverse sm:flex-row aspect-auto h-[40vh] items-center rounded-4xl shadow-lg justify-center overflow-hidden">
                <div className="flex grow bg-brand-secondary w-full sm:w-1/2 lg:w-auto sm:h-full px-4 sm:px-10 xl:px-20 py-2 sm:py-10 flex-col">
                  <h2 className="text-white sm:text-2xl lg:text-3xl xl:text-5xl font-extrabold tracking-wider md:w-2/3">
                    {course.title}
                  </h2>
                  <p className="text-white text-xs lg:text-base xl:text-3xl sm:mt-4 xl:mt-10">
                    {course.description}
                  </p>
                  <Link
                    className="sm:mt-10 xl:mt-14 mt-3 text-brand-primary shadow-md rounded-xl bg-white border border-brand-primary font-bold text-sm w-fit px-2 py-1 lg:px-4 lg:py-2"
                    to={`/courses/${course.id}`}
                  >
                    Explore Course in {course.Category.name} category
                  </Link>
                </div>
                <div className="sm:aspect-video bg-brand-secondary w-full sm:w-1/2 md:w-auto h-1/2 sm:h-full xl:w-auto xl:h-full">
                  <img
                    className="w-full h-full object-cover"
                    src={course.banner_image|| DefaultCourseBanner1}
                    alt={course.title}
                  />
                </div>
              </div>
            </CarouselItem>
          ))
        ) : (
          <div className="text-center py-10 text-lg text-white">
            No courses available.
          </div>
        )}
      </CarouselContent>
      <CarouselPrevious className="left-0 cursor-pointer border-none bg-black-30" />
      <CarouselNext className="right-0 cursor-pointer border-none bg-black-30" />
    </Carousel>
  );
}
