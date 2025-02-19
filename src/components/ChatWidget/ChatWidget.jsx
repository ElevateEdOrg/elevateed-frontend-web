import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { MessageFromUser, MessageToUser } from "./MessageType";
import { IoMdSend } from "react-icons/io";
import { BackButton } from "./BackButton";

const socket = io("http://localhost:8000", {
  path: "/api/chat/socket.io/", // Ensure it follows API Gateway routing
});

export const ChatWidget = () => {
  const userA = "1b0a44e1-3475-4391-9b2d-3e1b78105c38";
  const [chats, setChats] = useState([]);
  const [openChat, setOpenChat] = useState(null);
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);
  // const userB = "9f37a501-8e57-4286-acce-2fab91ebe7e0";

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    //Handle textarea height
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "40px"; // Reset initial height
    }
    if (!openChat) return;

    setMessage("");

    const fetchChatHistory = async () => {
      const res = await fetch(
        `http://localhost:8000/api/chat/history/${openChat.id}`
      );
      const data = await res.json();
      setMessages(data);
    };

    fetchChatHistory();

    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [openChat]);

  useEffect(() => {
    // Fetch all chats of userA
    const fetchChats = async () => {
      const res = await fetch(`http://localhost:8000/api/chat/list/${userA}`);
      const data = await res.json();
      setChats(data);
    };
    fetchChats();
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        senderId: openChat.sender_id,
        receiverId: openChat.receiver_id,
        message: message,
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_id: userA,
          sender_name: openChat.sender_name,
          message: message,
          sent_at: new Date().toISOString(),
        },
      ]);

      socket.emit("send_message", chatMessage);
      setMessage("");
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    // textAreaRef.current.style.height = "auto"; // Reset height to auto
    textAreaRef.current.style.height = `${Math.min(
      e.target.scrollHeight,
      132
    )}px`;
  };

  return (
    <section className="bg-slate-900 rounded-xl fixed bottom-0 right-0 p-4 m-6 h-[500px] w-96 text-slate-200  flex flex-col">
      <div className="flex border-b border-slate-500 justify-between items-center">
        {openChat ? <BackButton setOpenChat={setOpenChat} /> : ""}
        <h3 className="text-xl font-semibold text-slate-200 pb-4 ">
          {openChat?.receiver_name ? openChat.receiver_name : "Chats"}
        </h3>
      </div>
      {openChat === null ? (
        <div className="overflow-y-auto h-full flex flex-col gap-1 py-2  ">
          {chats.map((chat, index) => {
            let sender_name, receiver_name, sender_id, receiver_id;
            if (chat.user1_id === userA) {
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
                className="bg-slate-800 rounded-md p-2 flex gap-2 shadow-xl "
                onClick={() =>
                  setOpenChat({
                    id: chat.chat_id,
                    receiver_name: receiver_name,
                    receiver_id: receiver_id,
                    sender_id,
                    sender_name,
                  })
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
        </div>
      ) : (
        <div className="flex grow overflow-hidden flex-col gap-2 ">
          {/* Chats */}
          <div
            ref={messagesEndRef}
            className="overflow-y-auto flex grow flex-col gap-2 py-2  relative scroll-smooth pr-1"
          >
            {messages.map((message, index) => {
              if (message.sender_id === userA) {
                return (
                  <MessageFromUser
                    key={index}
                    message={message.message}
                    sent_at={message.sent_at}
                  />
                );
              } else {
                return (
                  <MessageToUser
                    key={index}
                    message={message.message}
                    sent_at={message.sent_at}
                  />
                );
              }
            })}
          </div>
          {/* Input and Send btn */}
          <div className="flex gap-2 items-end">
            <div
              ref={textAreaRef}
              className="w-full p-2 bg-slate-800 rounded-md min-h-10 max-h-32"
            >
              <textarea
                type="text"
                placeholder="Type a message..."
                value={message}
                // rows={1}
                onChange={handleInput}
                className="w-full h-full focus:outline-none resize-none min-h-10 max-h-32"
              />
            </div>
            <button
              onClick={sendMessage}
              className="bg-slate-700 p-2 rounded-full flex items-center justify-center cursor-pointer"
            >
              <IoMdSend size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
