import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadLectureMedia } from "@/components";
import {
  fetchUserCourses,
  fetchCourseContent,
  //   updateLecture,
  Lecture,
  updateLecture,
  deleteLecture,
} from "@/api/courseService";
import { Course } from "@/types";
import { toast } from "react-toastify";

export function UpdateLecture() {
  const [lecture, setLecture] = useState<Lecture>({
    course_id: "",
    id: "",
    title: "",
    description: "",
    video_path: "",
    pdf_path: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);

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

  const handleCourseChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCourseId = e.target.value;
    setLecture((prev) => ({ ...prev, course_id: selectedCourseId, id: "" }));
    try {
      const response = await fetchCourseContent(selectedCourseId);
      if (response.status !== 200 || !response.data.data.course.Lectures) {
        throw new Error("Error fetching lectures");
      }
      setLectures(response.data.data.course.Lectures);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  const handleLectureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLecture = lectures.find((lec) => lec.id === e.target.value);
    if (selectedLecture) {
      setLecture((prev) => ({
        ...selectedLecture,
        course_id: prev.course_id,
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLecture((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!lecture.course_id) return;
      const response = await updateLecture(lecture);
      if (response.status === 200) {
        toast.success("Lecture updated successfully");
      }
    } catch (error) {
      console.error("Failed to update lecture:", error);
    } finally {
      setLecture({
        course_id: "",
        id: "",
        title: "",
        description: "",
        video_path: "",
        pdf_path: "",
      });
    }
  };

  const handleDeleteLecture = async () => {
    try {
      if (!lecture.course_id || !lecture.id) return;
      const response = await deleteLecture(lecture.id);
      if (response.status === 200) {
        toast.success("Lecture deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete lecture:", error);
    } finally {
      setLecture({
        course_id: "",
        id: "",
        title: "",
        description: "",
        video_path: "",
        pdf_path: "",
      });
    }
  };

  return (
    <section className="w-full flex items-center justify-center">
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

            {/* Lecture Dropdown */}
            {lectures.length > 0 && (
              <select
                name="id"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lecture.id}
                onChange={handleLectureChange}
              >
                <option value="">Select Lecture</option>
                {lectures.map((lec) => (
                  <option key={lec.id} value={lec.id}>
                    {lec.title}
                  </option>
                ))}
              </select>
            )}

            <Textarea
              name="description"
              className="focus:ring-transparent"
              placeholder="Lecture Description"
              value={lecture.description}
              onChange={handleChange}
            />
            <UploadLectureMedia setLecture={setLecture} />
            <div>
              <Button
                type="submit"
                className="w-full mt-4 cursor-pointer text-xl bg-brand-primary text-white"
              >
                Update Lecture
              </Button>
              <Button
                onClick={handleDeleteLecture}
                className="w-full mt-4 cursor-pointer text-xl bg-red-400 text-white"
              >
                Delete Lecture
              </Button>
            </div>
          </div>
        </form>
      </article>
    </section>
  );
}
