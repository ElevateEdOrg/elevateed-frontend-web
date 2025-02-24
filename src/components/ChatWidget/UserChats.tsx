import { useSelector, useDispatch } from "react-redux";
import {
  setChats,
  setMessages,
  setOpenChat,
} from "../../redux/slices/chatSlice";
import { useEffect } from "react";
import { RootState } from "@/redux/store";
export const UserChats = () => {
  // const userA = "1b0a44e1-3475-4391-9b2d-3e1b78105c38";
  const chatState = useSelector((state: RootState) => state.chat);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { chats } = chatState;

  useEffect(() => {
    // Fetch all chats of userA
    const fetchChats = async () => {
      const res = await fetch(
        `http://localhost:8000/api/chat/list/${userInfo.id}`
      );
      if (res.status === 500) {
        return;
      }
      const data = await res.json();

      dispatch(setChats(data));
    };
    dispatch(setOpenChat(null));
    dispatch(setMessages([]));
    fetchChats();
  }, []);

  return (
    <div className="overflow-y-auto h-full flex flex-col gap-1 py-2  ">
      {chats.length !== 0 &&
        chats.map((chat, index) => {
          let sender_name, receiver_name, sender_id, receiver_id;
          if (chat.user1_id === userInfo.id) {
            receiver_id = chat.user2_id;
            receiver_name = chat.user2_name;
            sender_id = chat.user1_id;
            sender_name = chat.user1_name;
          } else {
            receiver_id = chat.user1_id;
            receiver_name = chat.user1_name;
            sender_id = chat.user2_id;
            sender_name = chat.user2_name;
          }
          return (
            <div
              key={index}
              className="bg-slate-800 rounded-md p-2 flex gap-2 shadow-xl cursor-pointer hover:bg-slate-900 transition-all duration-300"
              onClick={() =>
                dispatch(
                  setOpenChat({
                    id: chat.chat_id,
                    receiver_name: receiver_name,
                    receiver_id: receiver_id,
                    sender_id,
                    sender_name,
                    isNewChat: false,
                  })
                )
              }
            >
              <div className="w-12 h-12 rounded-full bg-slate-700  overflow-hidden flex items-center justify-center shadow-sm shadow-slate-400">
                <img className="object-cover" src="/vite.svg" alt="" />
              </div>
              <div className=" w-full">
                <p className="font-semibold">{receiver_name}</p>
                <p className="text-slate-400 text-xs line-clamp-1">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Numquam, impedit! Accusantium, ..
                </p>
              </div>
            </div>
          );
        })}
      {chats.length === 0 && (
        <p className="text-slate-400 text-center">No chats available</p>
      )}
    </div>
  );
};
