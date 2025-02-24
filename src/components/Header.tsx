import React from "react";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";

export const Header: React.FC = () => {
  return (
    <nav className="fixed h-24 w-full z-50 bg-white flex justify-between px-32 gap-24 border-b">
      <Link
        to="/"
        className="flex items-center pb-3 justify-between  h-full w-80"
      >
        <img className="w-full " src="./logo.png" alt="ElevateEd Logo" />
      </Link>
      <div className=" flex items-center py-5 w-full">
        <input
          className="border rounded-l-full border-r-0 px-6 py-2 w-full h-full focus-within:outline-none"
          type="text"
          placeholder="Search for courses..."
        />
        <button className=" border border-l-0 px-6 py-2 h-full rounded-r-full cursor-pointer">
          <FaSearch />
        </button>
      </div>
      <div className=" flex justify-center items-center gap-5">
        <Link
          to="/authenticate"
          className="w-50 py-3 rounded-full bg-neutral-800 text-white border-2 border-transparent hover:bg-transparent hover:border-neutral-800 hover:text-neutral-800 text-center"
        >
          Sign in / Sign up
        </Link>
      </div>
    </nav>
  );
};
