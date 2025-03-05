import React from "react";
import { Outlet } from "react-router";
import { ChatWidget, Footer, Navbar } from "@/components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ToastContainer } from "react-toastify";
export const RootLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <Navbar />
      <div>
        <Outlet />
        <ToastContainer position="top-right" autoClose={3000} />
        <Footer />
      </div>
      <ChatWidget />
    </SidebarProvider>
  );
};
