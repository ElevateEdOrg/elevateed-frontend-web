import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadLectureMedia } from "@/components";
import { createLecture } from "@/api/courseService";

export function CreateLecture() {
  const { courseId } = useParams();

  const [lecture, setLecture] = useState({
    course_id: courseId,
    title: "",
    description: "",
    video_path: "",
    pdf_path: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLecture((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("lecture", lecture);
    // API call logic to submit lecture data
    try {
      const response = await createLecture(lecture);
      if (response.status === 201) {
        console.log("Lecture created successfully", response.data);
        alert("Lecture created successfully");
        setLecture({
          course_id: courseId,
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

  return (
    <section className="px-32 flex items-center justify-center bg-brand-primary">
      <article className="bg-white pt-24 h-full w-full px-20 py-20 shadow-2xl shadow-gray-600">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 mt-10">
          Create a New Lecture
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-2xl border-none"
        >
          <div className="p-6 space-y-4">
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
            <Button type="submit" className="w-full mt-4">
              Create Lecture
            </Button>
          </div>
        </form>
      </article>
    </section>
  );
}
