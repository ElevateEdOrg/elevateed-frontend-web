import {
  AuthSider,
  LoginForm,
  RegisterForm,
  ResetPasswordForm,
} from "@/components";
import React, { useState } from "react";

import { AuthStates } from "@/types";
export const Authenticate: React.FC = () => {
  const [authType, setAuthType] = useState<AuthStates>("login");
  return (
    <section className="w-full h-full px-80 py-20 ">
      <article className="relative flex h-full w-full  rounded-2xl shadow-2xl py-10">
        <div className="absolute top-0 left-0 rounded-2xl w-full bg-cover opacity-30 -z-10  h-full bg-red-400 bg-[url(./login_bg.avif)]"></div>
        <AuthSider authType={authType} setAuthType={setAuthType} />
        <LoginForm authType={authType} setAuthType={setAuthType} />
        <RegisterForm authType={authType} />
        <ResetPasswordForm authType={authType} />
      </article>
    </section>
  );
};
