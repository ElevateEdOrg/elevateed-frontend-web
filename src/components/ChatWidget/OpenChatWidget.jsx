import React from "react";
import { CiChat1 } from "react-icons/ci";
import { PropTypes } from "prop-types";

export const OpenChatWidget = ({ setIsWidgetOpen, isWidgetOpen }) => {
  return (
    <div
      className={
        `fixed right-10 transition-all duration-300 z-40 bg-slate-900 cursor-pointer p-4 rounded-full shadow-xl shadow-gray-950 ` +
        (isWidgetOpen ? "-bottom-[1000px]" : "bottom-10")
      }
      onClick={() => setIsWidgetOpen(true)}
    >
      <CiChat1 size={32} color="white" />
    </div>
  );
};

OpenChatWidget.propTypes = {
  setIsWidgetOpen: PropTypes.func.isRequired,
  isWidgetOpen: PropTypes.bool.isRequired,
};
