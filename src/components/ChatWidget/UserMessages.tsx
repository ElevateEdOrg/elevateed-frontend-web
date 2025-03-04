import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MessageFromUser, MessageToUser } from "./MessageType";
import { IoMdSend } from "react-icons/io";
import {
  setChats,
  setMessages,
  setOpenChat,
} from "../../redux/slices/chatSlice";
import { RootState } from "../../redux/store";
import { Socket } from "socket.io-client";
import { API_BASE_URL } from "../../lib/axios";

interface UserMessagesProps {
  socket: Socket;
}

interface ReceivedMessage {
  chat_id?: string;
  message: string;
  sender_id: string;
  sent_at: string;
}

export const UserMessages: React.FC<UserMessagesProps> = ({ socket }) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLDivElement | null>(null);
  const chatState = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const { chats, messages, openChat } = chatState;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "40px";
    }
    if (!openChat || Object.keys(openChat).length === 0) return;

    setMessage("");

    const fetchChatHistory = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/chat/history/${openChat.id}`
        );
        if (res.ok) {
          const data = await res.json();
          dispatch(setMessages(data));
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    if (openChat.id) fetchChatHistory();

    socket.emit("register_user", userInfo.id);

    if (openChat.isNewChat) {
      socket.emit("send_message", {
        senderId: openChat.receiver_id,
        receiverId: openChat.sender_id,
        message: "Hello! Welcome to the chat. How can I assist you?",
        isNewChat: true,
      });
      dispatch(setOpenChat({ ...openChat, isNewChat: false }));
    }

    const handleReceiveMessage = (data: ReceivedMessage) => {
      dispatch(
        setMessages([
          ...messages,
          {
            sender_id: data.sender_id,
            message: data.message,
            sent_at: data.sent_at,
          },
        ])
      );
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
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [openChat]);

  const sendMessage = () => {
    if (openChat === null || !userInfo.id) return;

    if (message.trim()) {
      const chatMessage = {
        senderId: openChat.sender_id,
        receiverId: openChat.receiver_id,
        message,
        isNewChat: false,
      };

      dispatch(
        setMessages([
          ...messages,
          {
            sender_id: userInfo.id,
            sender_name: openChat.sender_name,
            message,
            sent_at: new Date().toISOString(),
          },
        ])
      );

      socket.emit("send_message", chatMessage);
      setMessage("");
      if (textAreaRef.current) textAreaRef.current.style.height = "40px";
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = `${Math.min(
        e.target.scrollHeight,
        132
      )}px`;
    }
  };

  return (
    <div className="flex grow overflow-hidden flex-col gap-2">
      <div
        ref={messagesEndRef}
        className="overflow-y-auto flex grow flex-col gap-2 py-2 pr-1"
      >
        {messages.length > 0 &&
          messages.map((message, index) =>
            message.sender_id === userInfo.id ? (
              <MessageFromUser
                key={index}
                message={message.message}
                sent_at={message.sent_at}
              />
            ) : (
              <MessageToUser
                key={index}
                message={message.message}
                sent_at={message.sent_at}
              />
            )
          )}
      </div>
      <div className="flex gap-2 items-end">
        <div
          ref={textAreaRef}
          className="w-full p-2 bg-slate-800 rounded-md min-h-10 max-h-32"
        >
          <textarea
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
          className="bg-slate-700 p-2 rounded-full flex items-center justify-center"
        >
          <IoMdSend size={20} />
        </button>
      </div>
    </div>
  );
};
