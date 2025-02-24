import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setOpenChat } from "../../redux/slices/chatSlice";

export const BackButton = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="pb-4 cursor-pointer"
      onClick={() => dispatch(setOpenChat(null))}
    >
      <IoMdArrowRoundBack size={25} />
    </div>
  );
};
