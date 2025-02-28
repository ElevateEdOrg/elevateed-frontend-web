import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/userSlice";

export const CustomAvatar: React.FC<{ avatar: string }> = ({ avatar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="relative">
      <Avatar
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="cursor-pointer shadow-md shadow-transparent hover:shadow-black/30 transition-all duration-300"
      >
        <AvatarImage className="object-cover" src={avatar} />
        <AvatarFallback className="">
          <img src="./defaultProfile.png" alt="Default Profile Picture" />
        </AvatarFallback>
      </Avatar>
      {isModalOpen && (
        <div className="absolute top-full right-full bg-white shadow-md rounded-md px-4 py-2 flex flex-col w-52">
          <Link
            onClick={() => setIsModalOpen(false)}
            className="py-2 hover:underline"
            to="profile"
          >
            Profile
          </Link>
          <button
            onClick={() => dispatch(logout())}
            className="border-t border-black py-2 cursor-pointer hover:text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
