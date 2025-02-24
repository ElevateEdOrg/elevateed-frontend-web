import React from "react";
import { Outlet } from "react-router";
import { ChatWidget } from "@/components";
import { Header } from "../components/Header";
export const RootLayout: React.FC = () => {
  return (
    <main className="h-screen">
      <Header />
      <section className="h-full pt-24">
        <Outlet />
      </section>
      <ChatWidget />
    </main>
  );
};
