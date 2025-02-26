import React from "react";
import { Outlet } from "react-router";
import { ChatWidget, Footer, Navbar } from "@/components";
import { SidebarProvider } from "@/components/ui/sidebar";
export const RootLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <Navbar />
      <div>
        <Outlet />
        <Footer />
      </div>
      <ChatWidget />
    </SidebarProvider>
  );
};
