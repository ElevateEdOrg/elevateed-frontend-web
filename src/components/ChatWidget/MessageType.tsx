import React from "react";

interface MessageType {
  message: string;
  sent_at: string;
}

export const MessageFromUser: React.FC<MessageType> = ({
  message,
  sent_at,
}) => {
  sent_at = new Date(sent_at).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex gap-2 justify-end w-full select-none">
      <div className="w-4/5 p-2  bg-slate-500 rounded-xl rounded-br-none shadow-md shadow-black break-words">
        <p className="text-slate-100 text-sm ">{message}</p>
        <p className="text-slate-300 text-xs ">{sent_at}</p>
      </div>
    </div>
  );
};
export const MessageToUser: React.FC<MessageType> = ({ message, sent_at }) => {
  sent_at = new Date(sent_at).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="flex gap-2 w-4/5 select-none">
      <div className=" w-4/5 shadow-md shadow-black bg-slate-800 rounded-md rounded-bl-none p-2 ">
        <p className="text-slate-300 text-sm ">{message}</p>
        <p className="text-slate-500 text-xs ">{sent_at}</p>
      </div>
    </div>
  );
};
