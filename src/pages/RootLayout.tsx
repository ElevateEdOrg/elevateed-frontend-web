import React from "react";
import { Outlet } from "react-router";
import { ChatWidget } from "@/components";
import { Header } from "../components/Navbar/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
export const RootLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <main className="h-screen">
        <Header />
        <section className="h-full pt-24">
          <AppSidebar />
          <Outlet />
        </section>
        <ChatWidget />
      </main>
    </SidebarProvider>
  );
};
