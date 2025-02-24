import { FaEyeSlash, FaEye } from "react-icons/fa";
import React, { useState } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full relative select-none">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={value}
        onChange={onChange}
        placeholder="Enter your password"
        className="my-4 w-full bg-white rounded-full shadow-xl px-4 py-3 focus-within:outline-none"
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
