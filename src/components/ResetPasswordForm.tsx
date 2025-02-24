import { AuthStates } from "@/types";
import React, { useState } from "react";

interface ResetPasswordFormProps {
  authType: AuthStates;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  authType,
}) => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://192.168.10.111:8001/auth/password-reset",
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
      className={`absolute w-1/2 h-full px-20 py-16 ${
        authType === "reset"
          ? "opacity-100 left-1/2"
          : "opacity-0 left-[10000px]"
      }`}
    >
      <h2 className="text-4xl font-black font-sans">Reset Password</h2>
      <form className="flex flex-col mt-20" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="my-4 bg-white rounded-full shadow-xl px-4 py-3 focus-within:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 rounded-full text-white py-3 cursor-pointer hover:bg-blue-800 my-4"
        >
          Send link to your mail
        </button>
      </form>
    </div>
  );
};
