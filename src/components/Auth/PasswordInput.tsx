import { FaEyeSlash, FaEye } from "react-icons/fa";
import React, { useState } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = "Enter your password",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full relative select-none">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white rounded-full shadow-xl  text-xs md:text-base px-4 py-2 md:py-3 focus-within:outline-none"
      />
      {!showPassword ? (
        <FaEyeSlash
          size={25}
          onClick={() => setShowPassword(true)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer "
        />
      ) : (
        <FaEye
          size={25}
          onClick={() => setShowPassword(false)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer "
        />
      )}
    </div>
  );
};
