import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { CiSearch } from "react-icons/ci";
import { SidebarTrigger } from "../ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CustomAvatar } from "./CustomAvatar";
import { AuthStates } from "@/types";
import { Cart } from "./Cart";
import { logo } from "@/assets";

interface HeaderProps {
  authType: string | null;
  setAuthType: React.Dispatch<React.SetStateAction<AuthStates | null>>;
}

export const Header: React.FC<HeaderProps> = ({ setAuthType }) => {
  const state = useSelector((state: RootState) => state);
  const { user } = state;

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="fixed w-screen h-20 z-50 bg-white flex justify-between items-center px-4 md:px-14 xl:px-32 gap-3 md:gap-5 lg:gap-24 border-b">
      <Link to="/" className="flex items-center h-full w-24 md:w-32 xl:w-40">
        <img className="w-full" src={logo} alt="ElevateEd Logo" />
      </Link>

      {/* Search */}
      <div className="flex items-center py-5 grow">
        <input
          className="border rounded-l-full border-r-0 px-2 md:px-6 py-2 w-full h-full focus-within:outline-none text-xs"
          type="text"
          placeholder="Search for courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="border border-l-0 px-2 md:px-6 h-full py-2 rounded-r-full cursor-pointer"
          onClick={handleSearch}
        >
          <CiSearch />
        </button>
      </div>

      <SidebarTrigger className="flex md:hidden" />

      {/* Login and register */}
      <div className="hidden md:flex justify-center items-center gap-2 xl:gap-5">
        {!user.isLoggedIn ? (
          <>
            <button
              onClick={() => setAuthType("login")}
              className="border-2 border-primary px-4 py-1 font-semibold rounded-2xl text-xs md:text-base cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => setAuthType("register")}
              className="border-2 border-transparent hover:border-black-90 bg-brand-primary px-4 py-1 font-semibold rounded-2xl text-white text-xs md:text-base"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            {user.userInfo.role === "student" && <Cart />}
            <CustomAvatar avatar={user.userInfo.avatar} />
          </>
        )}
      </div>
    </nav>
  );
};
