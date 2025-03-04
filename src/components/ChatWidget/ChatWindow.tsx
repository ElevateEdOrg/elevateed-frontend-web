import { BackButton } from "./BackButton";
import { FaChevronDown } from "react-icons/fa";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsWidgetOpen,
  setMessages,
  setOpenChat,
} from "../../redux/slices/chatSlice";
import { UserChats } from "./UserChats";
import { UserMessages } from "./UserMessages";
import { useEffect } from "react";
import { RootState } from "@/redux/store";
import { API_BASE_URL } from "../../lib/axios";

const socket = io(API_BASE_URL, {
  path: "/api/chat/socket.io/",
});

export const ChatWindow = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const { openChat, isWidgetOpen } = state.chat;

  useEffect(() => {
    dispatch(setOpenChat(null));
    dispatch(setMessages([]));
  }, []);

  return (
    <section
      className={
        "bg-slate-900 rounded-xl fixed z-50 right-0 px-4 py-2 m-6 h-[500px] w-80 lg:w-96 text-slate-200 flex flex-col transition-all duration-300 " +
        (isWidgetOpen ? "bottom-0" : "bottom-[-1000px]")
      }
    >
      {/* Close chat window */}
      <div
        onClick={() => {
          dispatch(setIsWidgetOpen(false));
          dispatch(setOpenChat(null));
          dispatch(setMessages([]));
        }}
        className="w-full h-4  flex items-center justify-center cursor-pointer"
      >
        <FaChevronDown />
      </div>
      {/* Chat header */}
      <div className="flex border-b border-slate-500 justify-between items-center">
        {openChat ? <BackButton /> : ""}
        <h3 className="text-xl font-semibold text-slate-200 pb-4 ">
          {openChat?.receiver_name ? openChat.receiver_name : "Chats"}
        </h3>
      </div>
      {/* Chat body */}
      {openChat === null || Object.keys(openChat).length === 0 ? (
        <UserChats />
      ) : (
        <UserMessages socket={socket} />
      )}
    </section>
  );
};
