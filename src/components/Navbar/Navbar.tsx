import React, { useState } from "react";
import { Header } from "./Header";
import { AppSidebar } from "./AppSidebar";
import { AuthStates } from "@/types";
import { AuthModals } from "../Auth/AuthModals";

export const Navbar = () => {
  const [authType, setAuthType] = useState<AuthStates | null>(null);
  return (
    <div>
      <Header authType={authType} setAuthType={setAuthType} />
      <AppSidebar authType={authType} setAuthType={setAuthType} />
      {authType && <AuthModals authType={authType} setAuthType={setAuthType} />}
    </div>
  );
};
