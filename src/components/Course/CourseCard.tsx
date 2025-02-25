import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Course } from "../../types/index";
import { cn } from "@/lib/utils";

const dummyCourse: Partial<Course> = {
  banner_image: "./src/assets/courseBanners/banner3.png",
  title: "Vue JS crash course",
  Instructor: {
    id: "37a8f2de-3df3-4d13-a32c-0ea0c64de833",
    email: "akelnfladknf@klnaldkfn.ad",
    full_name: "Kitani Studio",
  },
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat numquam vitae error odio velit. Corporis reiciendis eius non blanditiis officia veniam! Consequuntur asperiores, eos doloribus ullam, dolore voluptatibus molestiae omnis minima facere quod aliquam exercitationem ratione quos adipisci architecto quae non id atque sequi! Numquam, provident excepturi! Rerum, quas hic!",
  price: 79.09,
  Category: {
    id: "37a8f2de-3df3-4d13-a32c-0ea0c64de833",
    name: "Frontend",
  },
  created_at: "2021-09-09",
  id: "oirjoieofn1o2nro2nfo23knro2fkn3ont",
};

interface CourseCardProps {
  course?: Partial<Course>;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course = dummyCourse,
  className = "",
}) => {
  console.log("course img", course.banner_image);
  return (
    <article className={cn("w-80 xs:w-[400px] flex-shrink-0", className)}>
      {/* Image */}
      <div className="w-full aspect-video rounded-4xl overflow-hidden">
        <img
          className="w-full h-full"
          src={course.banner_image || "./src/assets/courseBanners/banner1.png"}
          alt={`Banner Image of ${course.title}`}
        />
      </div>
      <div>
        <h3 className="line-clamp-2 font-bold uppercase mt-2">
          {course.title}
        </h3>
        <div className="flex gap-2 px-1">
          <img src="/personIcon.svg" alt="" />
          <p className="text-sm text-brand-primary">
            {course.Instructor?.full_name}
          </p>
        </div>
        {course.description && (
          <p className="line-clamp-3 tracking-wide">{course.description}</p>
        )}
        {course.price && (
          <p className="flex gap-1 items-center font-bold text-lg">
            <FaRupeeSign />
            {course.price}
          </p>
        )}
      </div>
    </article>
  );
};
