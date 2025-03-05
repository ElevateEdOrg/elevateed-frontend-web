import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadLectureMedia } from "@/components";
import { createLecture, fetchUserCourses, Lecture } from "@/api/courseService";
import { Course } from "@/types";
import { toast } from "react-toastify";

export function CreateLecture() {
  const [lecture, setLecture] = useState<Partial<Lecture>>({
    course_id: "",
    title: "",
    description: "",
    video_path: "",
    pdf_path: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLecture((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourseId = e.target.value;
    setLecture((prev) => ({ ...prev, course_id: selectedCourseId }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("lecture", lecture);
    try {
      const response = await createLecture(lecture);
      if (response.status === 201) {
        console.log("Lecture created successfully", response.data);
        toast.success("Lecture created successfully");
        setLecture({
          course_id: "",
          title: "",
          description: "",
          video_path: "",
          pdf_path: "",
        });
      }
    } catch (error) {
      console.error("Failed to create lecture:", error);
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
    fetchCourses();
  }, []);

  return (
    <section className="w-full flex items-center justify-center ">
      <article className="bg-white h-full w-full px-20 pt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-2xl border-none rounded-2xl"
        >
          <div className="p-6 space-y-4">
            {/* Course Dropdown */}
            <select
              name="course_id"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lecture.course_id}
              onChange={handleCourseChange}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>

            <Input
              name="title"
              placeholder="Lecture Title"
              className="focus:ring-transparent"
              value={lecture.title}
              onChange={handleChange}
            />
            <Textarea
              name="description"
              className="focus:ring-transparent"
              placeholder="Lecture Description"
              value={lecture.description}
              onChange={handleChange}
            />
            <UploadLectureMedia setLecture={setLecture} />
            <Button
              type="submit"
              className="w-full mt-4 cursor-pointer text-xl bg-brand-primary text-white "
            >
              Create Lecture
            </Button>
          </div>
        </form>
      </article>
    </section>
  );
}
