import { AuthStates } from "@/types";
import React, { useState } from "react";

interface ResetPasswordFormProps {
  authType: AuthStates | null;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  authType,
}) => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://192.168.10.111:8001/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div
      className={`absolute w-full h-1/2 lg:w-1/2 lg:h-full px-10 2xl:px-20 py-8 md:py-10 lg:py-16 transition-all duration-300 ${
        authType === "reset"
          ? "opacity-100 lg:left-1/2 top-1/2  lg:top-0"
          : "opacity-0 lg:left-[10000px] top-[10000px]"
      }`}
    >
      <h2 className="text-xl md:text-2xl 2xl:text-4xl font-black font-sans">
        Reset Password
      </h2>
      <form className="flex flex-col mt-10 2xl:mt-20" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="my-4 bg-white rounded-full shadow-xl  text-xs md:text-base px-4 py-3 focus-within:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 rounded-full text-white py-3  text-xs md:text-base cursor-pointer hover:bg-blue-800 my-4"
        >
          Send OTP to your mail
        </button>
      </form>
    </div>
  );
};
