import React, { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { AuthStates } from "@/types";

interface RegisterFormProps {
  authType: AuthStates;
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await fetch("http://192.168.10.111:8001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div
      className={
        "absolute w-1/2 h-full px-20 py-16 " +
        (authType === "register"
          ? "opacity-100 left-1/2"
          : "opacity-0 left-[10000px]")
      }
    >
      <h2 className="text-4xl font-black font-sans">Register</h2>

      <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          onChange={handleChange}
          placeholder="Enter your full name"
          className="my-4 bg-white rounded-full shadow-xl px-4 py-3 focus-within:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
          className="my-4 bg-white rounded-full shadow-xl px-4 py-3 focus-within:outline-none"
          required
        />
        <select
          name="role"
          onChange={handleChange}
          className="my-4 bg-white rounded-full shadow-xl px-4 py-3 focus-within:outline-none appearance-none"
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <PasswordInput value={formData.password} onChange={handleChange} />
        <button
          type="submit"
          className="w-full bg-blue-600 rounded-full text-white py-3 cursor-pointer hover:bg-blue-800 my-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
