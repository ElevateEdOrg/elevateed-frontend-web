import { IoMdCart, IoMdHome, IoIosBookmarks } from "react-icons/io";
import { RiLoginCircleFill } from "react-icons/ri";
import { LiaSignInAltSolid } from "react-icons/lia";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: IoMdHome,
  },
  {
    title: "My Learning",
    url: "#",
    icon: IoIosBookmarks,
  },
  {
    title: "Cart",
    url: "#",
    icon: IoMdCart,
  },
  {
    title: "Login",
    url: "#",
    icon: RiLoginCircleFill,
  },
  {
    title: "Sign up",
    url: "#",
    icon: LiaSignInAltSolid,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-20">
          <SidebarGroupLabel>
            <div className="w-full mt-10">
              <img className="w-1/2" src="./logo.png" alt="ElevateEd Logo" />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
