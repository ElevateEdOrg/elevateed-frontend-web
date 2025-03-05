import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  fetchAllCategories,
  FetchCategoriesResponse,
  fetchCourseByQuery,
} from "@/api/courseService";
import { Course } from "@/types";
import { CourseCard, Loader } from "@/components";
import { IoMdClose } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";

const SearchResults: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  const [searchedCourses, setSearchedCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterModal, setFilterModal] = useState(false);

  // Filter States
  const [priceSort, setPriceSort] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);

  // Fetch courses & categories
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetchCourseByQuery(query);
        const courses: Course[] = response.data.data;
        setSearchedCourses(courses);
        setFilteredCourses(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchCategories = async () => {
      try {
        const response: FetchCategoriesResponse = await fetchAllCategories();
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (query) {
      fetchCourses();
      fetchCategories();
    }
  }, [query]);

  // Apply Filters
  useEffect(() => {
    let courses = [...searchedCourses];

    // Price Sorting
    if (priceSort === "low-to-high") {
      courses.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-to-low") {
      courses.sort((a, b) => b.price - a.price);
    }

    // Price Range Filter
    courses = courses.filter(
      (course) => course.price >= priceRange[0] && course.price <= priceRange[1]
    );

    // Rating Filter
    if (ratingFilter > 0) {
      courses = courses.filter((course) => course.avg_rating >= ratingFilter);
    }

    // Category Filter
    if (selectedCategories.length > 0) {
      courses = courses.filter((course) =>
        selectedCategories.includes(course.Category.id)
      );
    }

    setFilteredCourses(courses);
  }, [
    priceSort,
    priceRange,
    ratingFilter,
    selectedCategories,
    searchedCourses,
  ]);

  return (
    <section className="flex flex-col lg:flex-row gap-4 lg:gap-10 px-4 py-24 relative">
      {/* Filter Sidebar */}

      {!filterModal && (
        <button
          onClick={() => setFilterModal(true)}
          className="bg-gray-500 p-2 rounded-full flex items-center rotate-90 lg:rotate-0 justify-center w-fit h-fit text-white cursor-pointer m-auto"
        >
          <FaChevronRight />
        </button>
      )}
      {filterModal && (
        <aside className="lg:w-80 w-full lg:border-r p-4">
          <div className="relative">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <IoMdClose
              onClick={() => setFilterModal(false)}
              className="absolute top-0 right-0"
            />
          </div>

          {/* Price Sorting */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Sort by Price</h3>
            <div className="flex flex-col gap-1">
              <label>
                <input
                  type="radio"
                  name="priceSort"
                  value=""
                  checked={priceSort === ""}
                  onChange={() => setPriceSort("")}
                />{" "}
                None
              </label>
              <label>
                <input
                  type="radio"
                  name="priceSort"
                  value="low-to-high"
                  checked={priceSort === "low-to-high"}
                  onChange={() => setPriceSort("low-to-high")}
                />{" "}
                Low to High
              </label>
              <label>
                <input
                  type="radio"
                  name="priceSort"
                  value="high-to-low"
                  checked={priceSort === "high-to-low"}
                  onChange={() => setPriceSort("high-to-low")}
                />{" "}
                High to Low
              </label>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <input
              type="number"
              placeholder="Min Price"
              className="border p-2 rounded w-full mb-2"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
            />
            <input
              type="number"
              placeholder="Max Price"
              className="border p-2 rounded w-full"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Minimum Rating</h3>
            <div className="flex flex-col gap-1">
              {[0, 1, 2, 3, 4].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="ratingFilter"
                    value={rating}
                    checked={ratingFilter === rating}
                    onChange={() => setRatingFilter(rating)}
                  />{" "}
                  {rating === 0 ? "Any Rating" : `Above ${rating}`}
                </label>
              ))}
            </div>
          </div>

          {/* Categories selection */}
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul className="flex flex-col gap-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCategories.includes(category.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([
                            ...selectedCategories,
                            category.id,
                          ]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter(
                              (id) => id !== category.id
                            )
                          );
                        }
                      }}
                    />
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
      {/* Course Results */}
      <article className="w-full h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold mb-5">
          Search Results for "{query}"
        </h1>

        {loading ? (
          <div className="w-full h-96 flex justify-center items-center">
            <Loader />
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="flex flex-wrap justify-around gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p>No courses found matching "{query}"</p>
        )}
      </article>
    </section>
  );
};

export default SearchResults;
