import React from "react";
import { Course } from "../../types/index";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { DefaultCourseBanner1, personIcon } from "@/assets";
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
          src={course.banner_image || DefaultCourseBanner1}
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
            <img src={personIcon} alt="" />
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
        {course.Enrollment?.progress && <div className="mt-4">
          <p className="text-sm">Progress: {course.Enrollment?.progress}%</p>
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <div
              className="h-2 bg-brand-primary rounded-full "
              style={{ width: `${course.Enrollment?.progress}%` }}
            ></div>
          </div>
        </div>}
      </div>
    </article>
  );
};
