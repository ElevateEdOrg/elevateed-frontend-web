import React from "react";

export const PopularInstructors = () => {
  return (
    <article className="py-4">
      <div className="border-b pb-4 ">
        <h2 className="text-2xl font-bold ">Popular Instructors</h2>
        <p className="font-thin mt-4">
          Instructors who know what they are doing!
        </p>
      </div>
      <div className="mt-6 grid gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <div className="rounded-3xl overflow-hidden relative group">
          <div className="absolute flex items-end top-[1000px] group-hover:top-0 left-0 bg-linear-to-b from-transparent to-black-90 w-full h-full transition-all duration-300">
            <div className="flex flex-col items-center justify-center  text-white  h-1/2 w-full px-10">
              <h3 className="text-2xl font-bold border-b w-full text-center">
                John Doe
              </h3>
              <p className="text-sm font-bold mt-3">Web Developer</p>
              <p>14 courses - 10k+ students</p>
              <p>Average rating - 4.7 ⭐</p>
            </div>
          </div>
          <img src="./src/assets/instructors/Ins1.jpeg" alt="" />
        </div>
        <div className="rounded-3xl overflow-hidden relative group">
          <div className="absolute flex items-end top-[1000px] group-hover:top-0 left-0 bg-linear-to-b from-transparent to-black-90 w-full h-full transition-all duration-300">
            <div className="flex flex-col items-center justify-center  text-white  h-1/2 w-full px-10">
              <h3 className="text-2xl font-bold border-b w-full text-center">
                John Doe
              </h3>
              <p className="text-sm font-bold mt-3">Web Developer</p>
              <p>14 courses - 10k+ students</p>
              <p>Average rating - 4.7 ⭐</p>
            </div>
          </div>
          <img src="./src/assets/instructors/Ins1.jpeg" alt="" />
        </div>
        <div className="rounded-3xl overflow-hidden relative group">
          <div className="absolute flex items-end top-[1000px] group-hover:top-0 left-0 bg-linear-to-b from-transparent to-black-90 w-full h-full transition-all duration-300">
            <div className="flex flex-col items-center justify-center  text-white  h-1/2 w-full px-10">
              <h3 className="text-2xl font-bold border-b w-full text-center">
                John Doe
              </h3>
              <p className="text-sm font-bold mt-3">Web Developer</p>
              <p>14 courses - 10k+ students</p>
              <p>Average rating - 4.7 ⭐</p>
            </div>
          </div>
          <img src="./src/assets/instructors/Ins1.jpeg" alt="" />
        </div>
        <div className="rounded-3xl overflow-hidden relative group">
          <div className="absolute flex items-end top-[1000px] group-hover:top-0 left-0 bg-linear-to-b from-transparent to-black-90 w-full h-full transition-all duration-300">
            <div className="flex flex-col items-center justify-center  text-white  h-1/2 w-full px-10">
              <h3 className="text-2xl font-bold border-b w-full text-center">
                John Doe
              </h3>
              <p className="text-sm font-bold mt-3">Web Developer</p>
              <p>14 courses - 10k+ students</p>
              <p>Average rating - 4.7 ⭐</p>
            </div>
          </div>
          <img src="./src/assets/instructors/Ins1.jpeg" alt="" />
        </div>
      </div>
    </article>
  );
};
