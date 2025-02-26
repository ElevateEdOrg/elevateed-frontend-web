import React, { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { AuthStates } from "@/types";
import { AuthUserResponse, registerUser } from "@/api/authService";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/userSlice";

interface RegisterFormProps {
  authType: AuthStates | null;
}

interface FormData {
  full_name: string;
  email: string;
  role: "student" | "instructor";
  password: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ authType }) => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    role: "student",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res: AuthUserResponse = await registerUser(
        formData.full_name,
        formData.email,
        formData.role,
        formData.password
      );
      if (res.status !== 200) {
        throw new Error(res.data.message);
      }
      console.log("res", res);
      dispatch(login(res.data.user));
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        "Something went wrong!";
      setError(errorMessage);
    }
  };

  return (
    <div
      className={
        "absolute h-1/2 w-full lg:w-1/2 lg:h-full px-10 2xl:px-20 py-4 md:py-10 lg:py-16 transition-all duration-300 " +
        (authType === "register"
          ? "opacity-100 lg:left-1/2 top-1/2  lg:top-0 "
          : "opacity-0 lg:left-[10000px] top-[10000px] ")
      }
    >
      <h2
        className="text-lg md:text-xl lg:text-2xl 2xl:text-4xl font-black
      font-sans"
      >
        Register
      </h2>

      <form
        className="flex flex-col gap-2 lg:gap-4 mt-3 md:mt-5 2xl:mt-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="full_name"
          onChange={handleChange}
          placeholder="Enter your full name"
          className=" bg-white rounded-full shadow-xl  text-xs md:text-base px-4 py-2 md:py-3 focus-within:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
          className=" bg-white rounded-full shadow-xl   text-xs md:text-base px-4 py-2 md:py-3 focus-within:outline-none"
          required
        />
        <select
          name="role"
          onChange={handleChange}
          className=" bg-white rounded-full shadow-xl   text-xs md:text-base px-4 py-2 md:py-3 focus-within:outline-none appearance-none"
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <PasswordInput value={formData.password} onChange={handleChange} />
        <button
          type="submit"
          className="w-full bg-blue-600 rounded-full text-white py-2 md:py-3   text-xs md:text-base cursor-pointer hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
