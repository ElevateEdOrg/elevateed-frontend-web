import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Course } from "../../types/index";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import {
  FetchUserCoursesResponse,
} from "@/api/courseService";
// const dummyCourse: Partial<Course> = {
//   banner_image: "./src/assets/courseBanners/banner3.png",
//   title: "Vue JS crash course",
//   Instructor: {
//     id: "37a8f2de-3df3-4d13-a32c-0ea0c64de833",
//     email: "akelnfladknf@klnaldkfn.ad",
//     full_name: "Kitani Studio",
//   },
//   description:
//     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat numquam vitae error odio velit. Corporis reiciendis eius non blanditiis officia veniam! Consequuntur asperiores, eos doloribus ullam, dolore voluptatibus molestiae omnis minima facere quod aliquam exercitationem ratione quos adipisci architecto quae non id atque sequi! Numquam, provident excepturi! Rerum, quas hic!",
//   price: 79.09,
//   Category: {
//     id: "37a8f2de-3df3-4d13-a32c-0ea0c64de833",
//     name: "Frontend",
//   },
//   created_at: "2021-09-09",
//   id: "oirjoieofn1o2nro2nfo23knro2fkn3ont",
// };

interface MylearningCardProps {
  course: Course;
  className?: string;
}

export const MyLearningsCard: React.FC<MylearningCardProps> = ({
  course,
  className = "",
}) => {

  
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/courses/myLearning/${course.id}`)}
      className={cn(
        "w-80 xs:w-[400px] flex-shrink-0 cursor-pointer group  ",
        className
      )}
    >
      {/* Image */}
      <div className="w-full aspect-video rounded-4xl group-hover:shadow-md group-hover:shadow-gray-700 transition-all duration-200 overflow-hidden">
        <img
          className="w-full h-full"
          src={course.banner_image || "./src/assets/courseBanners/banner1.png"}
          alt={`Banner Image of ${course.title}`}
          draggable={false}
        />
      </div>
      <div>
        <h3 className="line-clamp-2 font-bold uppercase mt-2">
          {course.title}
        </h3>
        <div className="flex justify-between">
          <div className="flex gap-2 px-1">
            <img src="/personIcon.svg" alt="" />
            <p className="text-sm text-brand-primary">
              {course.Instructor?.full_name}
            </p>
          </div>
          <div className="flex gap-2 px-4 bg-brand-primary rounded-full">
            <p className="text-sm text-white">{course.Category?.name}</p>
          </div>
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
