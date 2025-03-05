import {
  FetchSingleCourseResponse,
  fetchUnpaidCourseFromId,
} from "@/api/courseService";
import { Course } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import imageUrl from "@/assets/courseBanners/banner1.png";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart } from "@/redux/slices/cartSlice";
import { setAuthState } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";
export const SingleCourse = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const { courseId } = useParams();
  const state = useSelector((state: RootState) => state);
  const { user } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      try {
        const response: FetchSingleCourseResponse =
          await fetchUnpaidCourseFromId(courseId);
        setCourse(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleAddToCart = () => {
    if (!course) return;
    dispatch(addToCart(course));
    toast.success("Course added to cart");
  };

  if (!course) return <section className="pt-24">Loading...</section>;

  return (
    <section className="pt-24 pb-10 min-h-screen flex flex-col-reverse xl:flex-row justify-center gap-10 px-6 lg:px-44 relative">
      <div className="absolute h-[40vh] bg-brand-primary w-full top-0 left-0 -z-10" />

      {/* Left Section - Course Info */}
      <article className="h-full xl:w-3/7 bg-white-60 rounded-3xl shadow-lg shadow-gray-600 p-6 flex flex-col gap-4">
        <img
          src={course.banner_image || imageUrl}
          alt="hehe"
          className="w-full h-56 object-cover rounded-xl"
        />
        <h1 className="xl:text-2xl font-semibold">{course.title}</h1>
        <p className="text-gray-700 text-sm xl:text-base">
          {course.description}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm">
            {course.total_students}+ students enrolled
          </span>
        </div>
        <div className="text-sm text-gray-600">
          <strong>Category:</strong> {course.Category.name}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Instructor:</strong> {course.Instructor.full_name}
        </div>
      </article>

      {/* Right Section - Video & Add to Cart */}
      <article className="h-full pb-10 flex flex-col gap-6 xl:w-2/7 bg-white-60 rounded-3xl shadow-lg shadow-gray-600 overflow-hidden">
        <div className="p-4">
          <video
            className="w-full rounded-3xl"
            controls
            src={
              course.intro_video ||
              "https://elevateed.s3.us-east-1.amazonaws.com/uploads/videos/1740399995689-wild_butterfly_in_nature_6891914.mp4"
            }
          ></video>
        </div>
        <div className="px-4">
          <h3 className="text-xl xl:text-3xl">Get this course for </h3>
          <p className="flex font-bold items-center xl:text-2xl my-4">
            <FaRupeeSign />
            {course.price}/- only
          </p>
          <div>
            {user.isLoggedIn ? (
              <Button
                onClick={handleAddToCart}
                className="w-full bg-brand-primary text-white hover:bg-brand-dark cursor-pointer"
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                onClick={() => dispatch(setAuthState("login"))}
                className="w-full bg-brand-secondary text-white hover:bg-brand-dark cursor-pointer"
              >
                Log in to Add to Cart
              </Button>
            )}
          </div>
        </div>
      </article>
    </section>
  );
};
