import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { fetchAllCourses, fetchCourseByQuery } from "@/api/courseService"; // Import your API function
import { Course } from "@/types";
import { CourseCard } from "@/components";

const SearchResults: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetchCourseByQuery(query);
        const courses: Course[] = response.data.data;
        console.log("Response", response);
        // // Filter courses based on search query (title or description match)
        // const filtered = courses.filter(
        //   (course) =>
        //     course.title.toLowerCase().includes(query.toLowerCase()) ||
        //     course.description.toLowerCase().includes(query.toLowerCase())
        // );

        setFilteredCourses(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchCourses();
    }
  }, [query]);

  return (
    <div className="container  mx-auto px-4 py-24">
      <h1 className="text-2xl font-bold mb-5">Search Results for "{query}"</h1>

      {loading ? (
        <p>Loading courses...</p>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p>No courses found matching "{query}"</p>
      )}
    </div>
  );
};

export default SearchResults;
