import { IoMdArrowRoundBack } from "react-icons/io";
import PropTypes from "prop-types";

export const BackButton = ({ setOpenChat }) => {
  return (
    <div className="pb-4 cursor-pointer" onClick={() => setOpenChat(null)}>
      <IoMdArrowRoundBack size={25} />
    </div>
  );
};

BackButton.propTypes = {
  setOpenChat: PropTypes.func.isRequired,
};
