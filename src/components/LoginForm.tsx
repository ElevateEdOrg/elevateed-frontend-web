import { AuthStates } from "@/types";
import { PasswordInput } from "./PasswordInput";
import { Dispatch, SetStateAction, useState } from "react";

interface LoginFormProps {
  authType: string;
  setAuthType: Dispatch<SetStateAction<AuthStates>>;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  authType,
  setAuthType,
}) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    const res = await fetch("http://192.168.10.111:8001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div
      className={
        "absolute w-1/2 h-full px-20 py-16 " +
        (authType === "login"
          ? "opacity-100 left-1/2"
          : "opacity-0 left-[10000px]")
      }
    >
      <h2
        className="text-4xl font-black
     font-sans"
      >
        Sign In
      </h2>
      <form className="flex flex-col mt-20" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="my-4 bg-white rounded-full shadow-xl px-4 py-3 focus-within:outline-none"
        />
        <PasswordInput onChange={handleChange} value={formData.password} />
        <button
          type="submit"
          // onClick={handleSubmit}
          className="w-full bg-blue-600 rounded-full text-white py-3 cursor-pointer hover:bg-blue-800 my-4"
        >
          Submit
        </button>
        <p className="text-sm">
          Forgot your password?{" "}
          <button
            onClick={(e) => {
              e.preventDefault();

              setAuthType("reset");
            }}
            className="text-blue-600 font-bold hover:underline"
          >
            Reset password
          </button>
        </p>
      </form>
    </div>
  );
};
