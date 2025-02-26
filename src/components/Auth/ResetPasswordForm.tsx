import {
  AuthUserResponse,
  forgotPassword,
  resetPassword,
} from "@/api/authService";
import { AuthStates } from "@/types";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { CustomInputOTP } from "./InputOTP";
import { FaArrowRight } from "react-icons/fa";
import { PasswordInput } from "./PasswordInput";
interface ResetPasswordFormProps {
  authType: AuthStates | null;
  setAuthType: React.Dispatch<React.SetStateAction<AuthStates | null>>;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  authType,
  setAuthType,
}) => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleForgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res: AuthUserResponse = await forgotPassword(email);
      console.log(res);
      if (res.status === 200) {
        alert("OTP sent to your mail");
        setAuthType("otp");
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        "Something went wrong!";
      console.log("error", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChangeRequest = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Data:", email, otp, password, confirmPassword);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const res = await resetPassword(email, otp, password);
      console.log(res);
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        "Something went wrong!";
      setError(errorMessage);
    }
  };

  return (
    <>
      {/* Forgot Password */}
      <div
        className={`absolute w-full h-1/2 lg:w-1/2 lg:h-full px-10 2xl:px-20 py-8 md:py-10 lg:py-16 transition-all duration-300 ${
          authType === "forgot"
            ? "opacity-100 lg:left-1/2 top-1/2  lg:top-0"
            : "opacity-0 lg:left-[10000px] top-[10000px]"
        }`}
      >
        <h2 className="text-xl md:text-2xl 2xl:text-4xl font-black font-sans">
          Reset Password
        </h2>
        <form
          className="flex flex-col mt-10 2xl:mt-20 relative"
          onSubmit={handleForgetPassword}
        >
          {error && (
            <p className="absolute bottom-full right-0 text-red-500 text-xs md:text-base">
              {error}
            </p>
          )}
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
            disabled={loading}
            className="w-full bg-blue-600 rounded-full text-white py-3  text-xs md:text-base cursor-pointer hover:bg-blue-800 my-4 disabled:bg-gray-600"
          >
            {loading ? "Loading..." : "Send OTP to your mail"}
          </button>
        </form>
      </div>
      {/* Entering OTP */}
      <div
        className={`absolute flex flex-col justify-around  w-full h-1/2 lg:w-1/2 lg:h-full px-10 2xl:px-20 py-8 md:py-10 lg:py-16 transition-all duration-300 ${
          authType === "otp"
            ? "opacity-100 lg:left-1/2 top-1/2  lg:top-0"
            : "opacity-0 lg:left-[10000px] top-[10000px]"
        }`}
      >
        <h2 className="text-xl md:text-2xl 2xl:text-4xl font-black font-sans">
          Enter OTP
        </h2>
        <div className=" flex items-center justify-center h-3/5">
          <CustomInputOTP value={otp} setValue={setOtp} />
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={() => setAuthType("reset")}
            className="bg-brand-primary p-4 rounded-full text-white"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      {/* Entering new Password */}
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
        <form
          className="flex flex-col mt-4 2xl:mt-20 relative gap-4"
          onSubmit={handlePasswordChangeRequest}
        >
          {error && (
            <p className="absolute bottom-full right-0 text-red-500 text-xs md:text-base">
              {error}
            </p>
          )}
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
          />
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 rounded-full text-white py-3  text-xs md:text-base cursor-pointer hover:bg-blue-800 my-2 disabled:bg-gray-600"
          >
            {loading ? "Loading..." : "Send OTP to your mail"}
          </button>
        </form>
      </div>
    </>
  );
};
