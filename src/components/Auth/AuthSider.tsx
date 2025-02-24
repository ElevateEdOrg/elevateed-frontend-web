import { AuthStates } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

interface AuthSiderProps {
  authType: AuthStates | null;
  setAuthType: Dispatch<SetStateAction<AuthStates | null>>;
}

export const AuthSider: React.FC<AuthSiderProps> = ({
  authType,
  setAuthType,
}) => {
  return (
    <div className="w-full h-1/2 lg:w-1/2 lg:h-full px-10 2xl:px-20 py-10 md:py-16 bg-blue-100 ">
      <h2
        className="md:text-3xl 2xl:text-4xl font-black
     font-sans"
      >
        Unlock Your Learning Potential
      </h2>
      <p className="text-xs lg:text-base font-thin mt-4 tracking-wide">
        Join <span className="text-green-600 font-bold">ElevateEd</span> and
        access top-notch courses from industry experts. Learn, grow, and elevate
        your skills—all in one place!
      </p>
      <div className="border my-4 md:my-10 2xl:my-16 border-gray-600" />
      {(authType === "login" || authType === "reset") && (
        <>
          <h3 className="md:text-xl 2xl:text-2xl font-bold">
            Don&apos;t have an account yet?
          </h3>
          <p className="my-5 2xl:my-10 text-sm md:text-base 2xl:text-lg">
            <button
              onClick={() => setAuthType("register")}
              className="text-blue-600 font-bold hover:underline pr-2"
            >
              Sign Up
            </button>
            now and start your learning journey today!
          </p>
        </>
      )}
      {authType === "register" && (
        <>
          <h3 className="md:text-xl  2xl:text-2xl font-bold">
            Already have an account?
          </h3>
          <p className="my-5 2xl:my-10 text-sm md:text-base 2xl:text-lg">
            <button
              onClick={() => setAuthType("login")}
              className="text-blue-600 font-bold hover:underline pr-2"
            >
              Sign In
            </button>
            now and continue your learning journey!
          </p>
        </>
      )}
    </div>
  );
};
