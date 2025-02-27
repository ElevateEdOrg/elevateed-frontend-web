import { useState } from "react";
import { MyCourses, UpdateProfileForm } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function Profile() {
  const [selectedTab, setSelectedTab] = useState(1);
  const state = useSelector((state: RootState) => state);
  const { user } = state;

  if (!user.isLoggedIn) {
    return (
      <section className="flex flex-col items-center min-h-screen pt-24 pb-10 px-6 lg:px-32  justify-center">
        <h1>Please log in to view this page</h1>
      </section>
    );
  }

  return (
    <section className="flex-col  min-h-screen pt-24 pb-10 px-6  lg:px-32 flex items-center justify-center">
      <h1 className="text-3xl font-bold py-4">Dashboard</h1>
      {/* Tab Triggers */}
      <article>
        <button
          onClick={() => setSelectedTab(1)}
          className={`cursor-pointer transition-all duration-100 px-4 py-2 ${
            selectedTab === 1 ? "border-b" : ""
          }`}
        >
          My courses
        </button>
        <button
          onClick={() => setSelectedTab(2)}
          className={`cursor-pointer transition-all duration-100 px-4 py-2 ${
            selectedTab === 2 ? "border-b" : ""
          }`}
        >
          Profile
        </button>
      </article>
      {/* Tab content */}
      {selectedTab === 1 && <MyCourses />}
      {selectedTab === 2 && <UpdateProfileForm />}
    </section>
  );
}
