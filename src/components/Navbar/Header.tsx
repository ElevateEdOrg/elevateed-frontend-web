import React from "react";
import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { SidebarTrigger } from "../ui/sidebar";
import { IoMdCart } from "react-icons/io";

export const Header: React.FC = () => {
  return (
    <nav className="fixed w-screen h-20 z-50 bg-white flex justify-between items-center px-4 md:px-14 xl:px-32 gap-3 md:gap-5 lg:gap-24 border-b">
      <Link to="/" className="flex items-center  h-full  w-24 md:w-32 xl:w-40">
        <img className="w-full " src="./logo.png" alt="ElevateEd Logo" />
      </Link>
      {/* Search */}
      <div className="flex items-center py-5 grow">
        <input
          className="border rounded-l-full border-r-0 px-2 md:px-6 py-2 w-full h-full focus-within:outline-none text-xs"
          type="text"
          placeholder="Search for courses..."
        />
        <button className="border border-l-0 px-2 md:px-6 h-full py-2 rounded-r-full cursor-pointer">
          <CiSearch />
        </button>
      </div>
      <SidebarTrigger className="flex md:hidden" />
      {/* Login and register */}
      <div className="hidden md:flex justify-center items-center gap-2 xl:gap-5">
        <Link
          className="p-2 hover:bg-gray-200 font-semibold rounded-full text-xs md:text-base"
          to="#"
        >
          <IoMdCart />
        </Link>
        <Link
          className="border-2 border-primary px-4 py-1 font-semibold rounded-2xl text-xs md:text-base"
          to="#"
        >
          Login
        </Link>
        <Link
          className="border-2 border-transparent hover:border-cyan-950 bg-cyan-600 px-4 py-1 font-semibold rounded-2xl text-white text-xs md:text-base"
          to="#"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};
