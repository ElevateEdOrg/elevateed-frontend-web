import { AuthStates } from "@/types";
import { PasswordInput } from "./PasswordInput";
import { Dispatch, SetStateAction, useState } from "react";
import { stringify } from "querystring";

interface LoginFormProps {
  authType: AuthStates | null;
  setAuthType: Dispatch<SetStateAction<AuthStates | null>>;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://192.168.10.111:8001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("res", res);
      if (res.status !== 200) {
        setError("Failed to login");
        throw new Error("Failed to login");
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={
        "absolute w-full h-1/2 lg:w-1/2 lg:h-full px-10 2xl:px-20 py-4 md:py-10 lg:py-16 transition-all duration-300 " +
        (authType === "login"
          ? "opacity-100 lg:left-1/2 top-1/2 lg:top-0"
          : "opacity-0 lg:left-[10000px] top-[10000px]")
      }
    >
      <h2
        className="text-2xl 2xl:text-4xl font-black
     font-sans"
      >
        Login
      </h2>
      <form
        className="flex flex-col md:mt-10 2xl:mt-20 relative"
        onSubmit={handleSubmit}
      >
        {error && (
          <p className="text-red-400  w-full text-sm absolute top-full left-1/2 -translate-x-1/2">
            {error}
          </p>
        )}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="my-4 bg-white rounded-full shadow-xl text-xs md:text-base px-4 py-3 focus-within:outline-none"
        />
        <PasswordInput onChange={handleChange} value={formData.password} />
        <button
          type="submit"
          // onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 rounded-full text-white py-3  text-xs md:text-base cursor-pointer hover:bg-blue-800 my-4"
        >
          {loading ? "Loading" : "Submit"}
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
