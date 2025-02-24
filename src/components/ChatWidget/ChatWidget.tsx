import { OpenChatWidget } from "./OpenChatWidget";
import { ChatWindow } from "./ChatWindow";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const ChatWidget = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  return (
    <>
      {isLoggedIn && (
        <>
          <OpenChatWidget /> <ChatWindow />
        </>
      )}
    </>
  );
};
