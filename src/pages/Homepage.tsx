import { useSelector, useDispatch } from "react-redux";
import { login } from "@/redux/slices/userSlice";
import {
  BrowseCourses,
  CourseCard,
  HeroBanner,
  StartChatButton,
} from "@/components";
import React from "react";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { dummyCourse } from "@/../db";

export const Homepage: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const foo = () => {
    console.log(state);
  };

  const addStudentUserToState = () => {
    dispatch(
      login({
        id: "04b8bbab-e20f-4b6e-9020-e8c51dad9a43",
        full_name: "Yash Solanki",
        email: "thisisyashs@gmail.com",
        role: "student",
      })
    );
    console.log("User state updated to student");
  };

  const addInstructorUserToState = () => {
    dispatch(
      login({
        id: "37a8f2de-3df3-4d13-a32c-0ea0c64de833",
        full_name: "jhanvi",
        email: "jhanvi.2302@gmail.com",
        role: "instructor",
      })
    );
    console.log("User state updated to instructor");
  };

  return (
    <section className="max-h-screen w-screen pt-24 px-4 xl:px-32 overflow-x-hidden">
      <article className="flex flex-col items-center w-full pb-10 ">
        <HeroBanner />
      </article>
      <article className="py-4">
        <h2 className="text-2xl font-bold border-b pb-4 ">Continue Watching</h2>
        <CourseCard course={dummyCourse} className="pt-4" />
      </article>
      <BrowseCourses />
      {/* Testing */}
      <div className="flex flex-col gap-10">
        Homepage
        <Button className="bg-brand-primary" onClick={foo}>
          Click me
        </Button>
        <button onClick={addStudentUserToState} className=" py-4">
          User state: Student
        </button>
        <button onClick={addInstructorUserToState} className=" py-4">
          User state: Jhanvi instructor
        </button>
        {/* <Button>Send Message to Jhanvi</Button> */}
        <StartChatButton
          instructorId="37a8f2de-3df3-4d13-a32c-0ea0c64de833"
          instructorName="jhanvi"
        />
        <StartChatButton
          instructorId="54873533-4cce-4aa0-ab31-665a4fc5e788"
          instructorName="Modi"
        />
        <button>Send Message to Modi</button>
      </div>
    </section>
  );
};
