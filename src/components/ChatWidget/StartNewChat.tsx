// Import Redux hooks
import { useDispatch, useSelector } from "react-redux";
import { setIsWidgetOpen, setOpenChat } from "../../redux/slices/chatSlice";
import React from "react";
import { RootState } from "@/redux/store";

interface StartChatButtonProps {
  instructorId: string;
  instructorName: string;
}

export const StartChatButton: React.FC<StartChatButtonProps> = ({
  instructorId,
  instructorName,
}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const startChat = () => {
    if (!userInfo || !userInfo.id) return null;
    dispatch(
      setOpenChat({
        sender_id: userInfo.id,
        receiver_id: instructorId,
        sender_name: userInfo.full_name,
        receiver_name: instructorName,
        isNewChat: true, // Mark as new chat
      })
    );
    dispatch(setIsWidgetOpen(true));
    return;
  };

  return (
    <button
      onClick={startChat}
      disabled={userInfo.role === "instructor"}
      className="bg-blue-500 text-white p-2 rounded disabled:bg-red-400"
    >
      Start Chat with {instructorName}
    </button>
  );
};
