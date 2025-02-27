import React, { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { AuthStates } from "@/types";
import { AuthUserResponse, registerUser } from "@/api/authService";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/userSlice";

interface RegisterFormProps {
  authType: AuthStates | null;
  setAuthType: React.Dispatch<React.SetStateAction<AuthStates | null>>;
}

interface FormData {
  full_name: string;
  email: string;
  role: "student" | "instructor";
  password: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  authType,
  setAuthType,
}) => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    role: "student",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res: AuthUserResponse = await registerUser(
        formData.full_name,
        formData.email,
        formData.role,
        formData.password
      );
      if (res.status !== 201) {
        throw new Error(res.data.message);
      }
      dispatch(login(res.data.user));
      if (res.data.status === "success") {
        alert("Register successful");
        setAuthType(null);
      }
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        "Something went wrong!";
      console.log("error", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      if (authType === "register" && error === null) {
        setFormData({
          full_name: "",
          email: "",
          role: "student",
          password: "",
        });
      }
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
        className="flex flex-col gap-2 lg:gap-4 mt-3 md:mt-5 2xl:mt-10 relative"
        onSubmit={handleSubmit}
      >
        {error && (
          <p className="absolute text-red-500 text-xs bottom-full right-0">
            {error}
          </p>
        )}
        <input
          type="text"
          name="full_name"
          onChange={handleChange}
          value={formData.full_name}
          placeholder="Enter your full name"
          className=" bg-white rounded-full shadow-xl  text-xs md:text-base px-4 py-2 md:py-3 focus-within:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
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
          disabled={loading}
          className="w-full bg-blue-600 rounded-full text-white py-2 md:py-3   text-xs md:text-base cursor-pointer hover:bg-blue-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};
