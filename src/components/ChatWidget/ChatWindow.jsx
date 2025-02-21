import { BackButton } from "./BackButton";
import { FaChevronDown } from "react-icons/fa";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setIsWidgetOpen, setOpenChat } from "../../redux/slices/chatSlice";
import { UserChats } from "./UserChats";
import { UserMessages } from "./UserMessages";
import { useEffect } from "react";

const socket = io("http://localhost:8000", {
  path: "/api/chat/socket.io/",
});

export const ChatWindow = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { openChat, isWidgetOpen } = state.chat;

  useEffect(() => {
    dispatch(setOpenChat(null));
  }, []);

  return (
    <section
      className={
        "bg-slate-900 rounded-xl fixed right-0 px-4 py-2 m-6 h-[500px] w-96 text-slate-200 flex flex-col transition-all duration-300 " +
        (isWidgetOpen ? "bottom-0" : "bottom-[-1000px]")
      }
    >
      {/* Close chat window */}
      <div
        onClick={() => {
          dispatch(setIsWidgetOpen(false));
          dispatch(setOpenChat(null));
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
