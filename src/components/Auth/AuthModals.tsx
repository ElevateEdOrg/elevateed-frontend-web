import { AuthStates } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import { IoMdClose } from "react-icons/io";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { AuthSider } from "./AuthSider";

export const AuthModals: React.FC<{
  setAuthType: Dispatch<SetStateAction<AuthStates | null>>;
  authType: AuthStates | null;
}> = ({ authType, setAuthType }) => {
  return (
    <section className="fixed flex py-4 justify-center items-center top-0 left-0 w-screen h-screen overflow-hidden bg-gray-200/50 px-5 py-14 z-50">
      <article className="bg-white w-full sm:w-2/3 h-full rounded-2xl shadow-2xl overflow-hidden relative flex">
        <AuthSider authType={authType} setAuthType={setAuthType} />
        <LoginForm authType={authType} setAuthType={setAuthType} />
        <RegisterForm authType={authType} setAuthType={setAuthType} />
        <ResetPasswordForm authType={authType} setAuthType={setAuthType} />
        <IoMdClose
          onClick={() => setAuthType(null)}
          className="absolute top-4 right-4 cursor-pointer"
        />
      </article>
    </section>
  );
};
