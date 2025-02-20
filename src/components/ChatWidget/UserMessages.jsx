import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MessageFromUser, MessageToUser } from "./MessageType";
import { IoMdSend } from "react-icons/io";
import { setChats, setMessages } from "../../redux/slices/chatSlice";
import { PropTypes } from "prop-types";

export const UserMessages = ({ socket }) => {
  const userA = "1b0a44e1-3475-4391-9b2d-3e1b78105c38";
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { chats, messages, openChat } = chatState;
  const [message, setMessage] = useState("");

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
    if (!openChat || Object.keys(openChat).length === 0) return;

    setMessage("");

    const fetchChatHistory = async () => {
      const res = await fetch(
        `http://localhost:8000/api/chat/history/${openChat.id}`
      );
      const data = await res.json();
      dispatch(setMessages(data));
    };

    fetchChatHistory();

    socket.emit("register_user", userA);

    socket.on("receive_message", (data) => {
      console.log("Received message", data);

      dispatch(
        setMessages([
          ...messages, // Use current messages from Redux state
          {
            sender_id: data.sender_id,
            sender_name: data.sender_name,
            message: data.message,
            sent_at: data.sent_at,
          },
        ])
      );

      // Update chat list to reflect latest message
      dispatch(
        setChats(
          chats.map((chat) =>
            chat.chat_id === data.chat_id
              ? {
                  ...chat,
                  last_message: data.message,
                  last_sent_at: data.sent_at,
                }
              : chat
          )
        )
      );
    });

    return () => {
      socket.off("receive_message");
    };
  }, [openChat]);

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        senderId: openChat.sender_id,
        receiverId: openChat.receiver_id,
        message: message,
      };

      dispatch(
        setMessages([
          ...messages, // Use current messages from Redux state
          {
            sender_id: userA,
            sender_name: openChat.sender_name,
            message: message,
            sent_at: new Date().toISOString(),
          },
        ])
      );

      socket.emit("send_message", chatMessage);
      setMessage("");
      textAreaRef.current.style.height = "40px";
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    textAreaRef.current.style.height = `${Math.min(
      e.target.scrollHeight,
      132
    )}px`;
  };
  return (
    <div className="flex grow overflow-hidden flex-col gap-2 ">
      {/* Chats */}
      <div
        ref={messagesEndRef}
        className="overflow-y-auto flex grow flex-col gap-2 py-2  relative scroll-smooth pr-1"
      >
        {messages?.map((message, index) => {
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
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
  );
};

UserMessages.propTypes = {
  socket: PropTypes.object.isRequired,
};
