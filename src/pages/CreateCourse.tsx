import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadBannerAndIntro } from "@/components";
import { createCourse, fetchAllCategories } from "@/api/courseService";
import { toast } from "react-toastify";

export function CreateCourse() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category_id: "", // Stores selected category ID
    price: "",
    welcome_msg: "",
    banner_image: "",
    intro_video: "",
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("course", course);
    try {
      const response = await createCourse(course);
      if (response.status === 201) {
        toast.success("Course created successfully");
      }
    } catch (error) {
      console.log("Error creating course", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchAllCategories();
      setCategories(response.data.data);
    };
    fetchCategories();
  }, []);

  return (
    <section className="w-full flex items-center justify-center pt-10">
      <article className="bg-white h-full w-full px-20">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-2xl border-none rounded-2xl"
        >
          <div className="p-6 space-y-4">
            <Input
              name="title"
              placeholder="Course Title"
              className="focus:ring-transparent"
              value={course.title}
              onChange={handleChange}
            />
            <Textarea
              name="description"
              className="focus:ring-transparent"
              placeholder="Course Description"
              value={course.description}
              onChange={handleChange}
            />

            {/* Category Selection */}
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

            <Input
              name="price"
              type="number"
              placeholder="Price"
              className="focus:ring-transparent"
              value={course.price}
              onChange={handleChange}
            />
            <Textarea
              name="welcome_msg"
              placeholder="Welcome Message"
              className="focus:ring-transparent"
              value={course.welcome_msg}
              onChange={handleChange}
            />
            <UploadBannerAndIntro setCourse={setCourse} />
            <Button type="submit" className="w-full mt-4">
              Create Course
            </Button>
          </div>
        </form>
      </article>
    </section>
  );
}
