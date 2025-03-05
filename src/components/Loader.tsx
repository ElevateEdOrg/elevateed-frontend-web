import { loader } from "@/assets";
import React from "react";

export const Loader = () => {
  return (
    <div className="min-w-5 min-h-5 h-full w-full max-w-20 max-h-20 aspect-square rounded-full animate-bounce">
      <img src={loader} alt="Loading..." className="" />
    </div>
  );
};
