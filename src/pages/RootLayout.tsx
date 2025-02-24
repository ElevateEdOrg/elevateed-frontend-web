import React from "react";
import { Outlet } from "react-router";
import { ChatWidget, Navbar } from "@/components";
import { SidebarProvider } from "@/components/ui/sidebar";
export const RootLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <main className="h-screen">
        <Navbar />
        <section className="h-full pt-24">
          <Outlet />
        </section>
        <ChatWidget />
      </main>
    </SidebarProvider>
  );
};
