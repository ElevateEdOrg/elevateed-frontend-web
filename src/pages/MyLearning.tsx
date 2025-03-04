import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  fetchCourseContent,
  FetchCourseDetailsResponse,
  Lecture,
  updateLectureStatus,
} from "../api/courseService";
import { StartChatButton } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const MyLearning: React.FC = () => {
  const [courseContent, setCourseContent] =
    useState<FetchCourseDetailsResponse>();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<Lecture>();
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();

  const tabs = ["Overview", "Q&A", "Notes"];

  const { user } = useSelector((state: RootState) => state);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      if (!courseId) return;
      try {
        const response = await fetchCourseContent(courseId);
        setCourseContent(response.data.data);
      } catch (error) {
        // Handle 403 error
        console.error("Error fetching course content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);
  console.log("state",courseContent)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const videoEnded = async () => {
    if (selectedLecture) {
      console.log("Video Ended. Lecture ID:", selectedLecture.id);
      try {
        const response = await updateLectureStatus(selectedLecture.id);
        console.log("Lecture Status Updated:", response);
      } catch (error) {
        console.error("Error updating lecture status:", error);
      }
    } else {
      console.error("No selected lecture found.");
    }
  };

  if (loading)
    return (
      <h1 className="pt-24 h-screen flex justify-center items-center text-4xl">
        Loading...
      </h1>
    );

  if (!courseContent) {
    return (
      <div className="pt-24 h-screen gap-20 flex justify-center items-center flex-col">
        <p className=" text-4xl">You don't have this course purchased!</p>
        <Link
          className="text-brand-primary font-bold hover:underline text-xl"
          to={`/courses/${courseId}`}
        >
          Go to Course Page
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex relative">
        {/* Video Player */}
        <div
          className={`${
            isCollapsed ? "w-full" : "w-full md:w-3/4"
          } bg-black  transition-all duration-300`}
        >
          <div className="relative h-full flex items-center justify-center">
            <video
              className="w-full"
              src={
                selectedLecture?.video_path ||
                courseContent?.course.intro_video ||
                ""
              }
              poster={courseContent?.course.banner_image || ""}
              controls
              onEnded={videoEnded}
            />
          </div>
        </div>

        {/* Course Content Sidebar */}
        <div
          className={`${
            isCollapsed
              ? "hidden"
              : "absolute md:relative inset-0 z-10 md:w-1/4 bg-white md:bg-gray-50"
          } overflow-y-auto border-l transition-all duration-300`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold text-lg">Course content</h2>
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="px-4 py-10 w-full max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Course Lectures</h2>

            {courseContent?.course.Lectures.map((lecture, secIdx) => (
              <div
                key={secIdx}
                className="rounded-lg mb-2"
                onClick={() => setSelectedLecture(lecture)}
              >
                {/* lecture Header (Click to Toggle) */}
                <div className="px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-xl flex justify-between items-center cursor-pointer transition-all duration-300">
                  <span className="font-medium">{lecture.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs & Description */}
      <div className="border-t">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap cursor-pointer ${
                tab === activeTab
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
          {user.userInfo.role === "student" && (
            <div
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap cursor-pointer`}
            >
              <StartChatButton
                instructorId={courseContent.course.Instructor.id}
                instructorName={courseContent.course.Instructor.full_name}
              />
            </div>
          )}
        </div>

        {/* Course Description */}
        <div className="p-4">
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            {courseContent?.course.title ||
              "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps"}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-2">
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg md:text-2xl font-bold mr-1">
                {courseContent?.userRating || "4.7"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="gold"
                stroke="gold"
                strokeWidth="1"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
          </div>

          {activeTab === "Overview" && (
            <div className="mt-6">
              <p className="text-gray-700">
                {courseContent?.course.description ||
                  "This comprehensive course covers everything you need to become a professional full-stack web developer. From front-end technologies like HTML, CSS, and JavaScript to back-end development with Node.js and database management with PostgreSQL. You'll also learn modern frameworks like React and dive into Web3 technologies."}
              </p>
            </div>
          )}
          {activeTab === "Notes" && (
            <div className="mt-6 ">
              {courseContent.course.Lectures.map((lecture) => {
                if (!lecture.pdf_path) {
                  return null;
                }
                return (
                  <div
                    key={lecture.id}
                    className="bg-gray-200 hover:bg-gray-300 px-10 py-3 rounded-xl font-semibold hover:underline transition-all duration-300"
                  >
                    <a
                      target="_blank"
                      href="https://elevateed.s3.us-east-1.amazonaws.com/uploads/documents/1740481460482-false.pdf"
                    >
                      {lecture.title}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
