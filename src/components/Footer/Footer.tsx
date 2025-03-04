import React from "react";
import { Link } from "react-router";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { dummyCategories } from "@/../db";
import { logo_dark } from "@/assets";

export const Footer = () => {
  return (
    <section className="bg-[#1b1b1b] px-5 md:px-32  flex flex-col justify-between">
      <div className="py-10 flex flex-col md:flex-row lg:h-[30vh] justify-between gap-10">
        <Link
          to="/"
          className="flex items-center   h-fit  w-24 md:w-32 xl:w-40"
        >
          <img className="w-full " src={logo_dark} alt="ElevateEd Logo" />
        </Link>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-3">
          {dummyCategories.map((category) => (
            <p
              key={category.id}
              className="text-white/60 cursor-pointer border-b border-transparent hover:border-white/30 hover:text-white transition-all duration-300"
            >
              {category.name}
            </p>
          ))}
        </div>
      </div>
      <article className="border-t border-white-60 h-16 flex items-center justify-between">
        <p className="text-white/30">
          Copyright &copy; ElevateEd 2025. All rights reserved.
        </p>
        <div className="flex items-center space-x-2">
          <div className="text-white/30 border border-transparent rounded-full p-1 hover:text-white cursor-pointer hover:border-white transition-all duration-300">
            <FaInstagram />
          </div>
          <div className="text-white/30 border border-transparent rounded-full p-1 hover:text-white cursor-pointer hover:border-white transition-all duration-300">
            <FaFacebookF />
          </div>
          <div className="text-white/30 border border-transparent rounded-full p-1 hover:text-white cursor-pointer hover:border-white transition-all duration-300">
            <FaTwitter />
          </div>
        </div>
      </article>
    </section>
  );
};
