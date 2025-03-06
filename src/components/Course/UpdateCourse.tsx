import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadBannerAndIntro } from "@/components";
import {
  deleteCourse,
  fetchAllCategories,
  fetchUserCourses,
  updateCourse,
} from "@/api/courseService";
import { Course } from "@/types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function UpdateCourse() {
  const [course, setCourse] = useState<Partial<Course>>({
    title: "",
    description: "",
    category_id: "",
    price: "",
    welcome_msg: "",
    banner_image: "",
    intro_video: "",
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setCourse((prev) => ({ ...prev, category_id: selectedId }));
  };

  const handleCourseChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = e.target.value;
    setSelectedCourseId(selectedId);

    // Fetch the course details for the selected course
    if (selectedId) {
      try {
        // Find course in courses array with id === selectedId
        const selectedCourse = courses.find(
          (course) => course.id === selectedId
        );
        if (!selectedCourse) {
          throw new Error("Course not found");
        }
        setCourse({
          title: selectedCourse.title,
          description: selectedCourse.description,
          category_id: selectedCourse.category_id,
          price: selectedCourse.price,
          welcome_msg: selectedCourse.welcome_msg,
          banner_image: selectedCourse.banner_image,
          intro_video: selectedCourse.intro_video,
        });
      } catch (error) {
        console.log("Error fetching course details", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateCourse(selectedCourseId, course);
      if (response.status === 200) {
        toast.success("Course updated successfully");
      }
    } catch (error) {
      console.log("Error updating course", error);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      const response = await deleteCourse(selectedCourseId);
      if (response.status === 200) {
        toast.success("Course deleted successfully");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 403) {
          toast.error("Course cannot be deleted as it has enrollments");
        }
      } else {
        console.error("Error deleting course:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchUserCourses();
        if (response.status !== 200 || !response.data.data.courses) {
          throw new Error("Error fetching courses");
        }
        setCourses(response.data.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await fetchAllCategories();
        if (response.status !== 200) {
          throw new Error("Error fetching categories");
        }
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    fetchCourses();
  }, []);

  return (
    <section className="w-full flex items-center justify-center pt-10">
      <article className="bg-white h-full w-full px-20">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-2xl border-none rounded-2xl"
        >
          <div className="p-6 space-y-4">
            {/* Course Selection Dropdown */}
            <select
              name="course"
              className="w-full p-2 border rounded-lg"
              value={selectedCourseId}
              onChange={handleCourseChange}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>

            {/* Course Title */}
            <Input
              name="title"
              placeholder="Course Title"
              className="focus:ring-transparent"
              value={course.title}
              onChange={handleChange}
            />

            {/* Course Description */}
            <Textarea
              name="description"
              placeholder="Course Description"
              className="focus:ring-transparent"
              value={course.description}
              onChange={handleChange}
            />

            {/* Category Dropdown */}
            <select
              name="category"
              className="w-full p-2 border rounded-lg"
              value={course.category_id}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Price Input */}
            <Input
              name="price"
              type="number"
              placeholder="Price"
              className="focus:ring-transparent"
              value={course.price}
              onChange={handleChange}
            />

            {/* Welcome Message */}
            <Textarea
              name="welcome_msg"
              placeholder="Welcome Message"
              className="focus:ring-transparent"
              value={course.welcome_msg}
              onChange={handleChange}
            />

            {/* Banner and Intro Video Upload */}
            <UploadBannerAndIntro setCourse={setCourse} />
            <div>
              <Button
                type="submit"
                className="w-full mt-4 cursor-pointer text-xl bg-brand-primary text-white"
              >
                Update Course
              </Button>
              <Button
                onClick={handleDeleteCourse}
                type="submit"
                className="w-full mt-4 cursor-pointer text-xl bg-red-400 text-white"
              >
                Delete Course
              </Button>
            </div>
          </div>
        </form>
      </article>
    </section>
  );
}
