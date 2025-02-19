import React from "react";
import { Outlet } from "react-router";
import { ChatWidget } from "@/components";
export const RootLayout = () => {
  return (
    <main>
      RootLayout
      <Outlet />
      <ChatWidget />
    </main>
  );
};
