import { CiChat1 } from "react-icons/ci";
import { PropTypes } from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setIsWidgetOpen } from "../../redux/slices/chatSlice";

export const OpenChatWidget = () => {
  const chatState = useSelector((state) => state.chat);
  const { isWidgetOpen } = chatState;
  const dispatch = useDispatch();

  return (
    <div
      className={
        `fixed right-10 transition-all duration-300 z-40 bg-slate-900 cursor-pointer p-4 rounded-full shadow-xl shadow-gray-950 ` +
        (isWidgetOpen ? "-bottom-[1000px]" : "bottom-10")
      }
      onClick={() => dispatch(setIsWidgetOpen(true))}
    >
      <CiChat1 size={32} color="white" />
    </div>
  );
};

OpenChatWidget.propTypes = {
  setIsWidgetOpen: PropTypes.func.isRequired,
  isWidgetOpen: PropTypes.bool.isRequired,
};
