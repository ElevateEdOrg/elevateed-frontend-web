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
  useSidebar,
} from "@/components/ui/sidebar";
import { AuthStates } from "@/types";
import { Dispatch, SetStateAction } from "react";

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
];
interface AppSidebarProps {
  authType: AuthStates | null;
  setAuthType: Dispatch<SetStateAction<AuthStates | null>>;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ setAuthType }) => {
  const { openMobile, setOpenMobile } = useSidebar();
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
              {/* Login Button */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={() => {
                      setAuthType("login");
                      setOpenMobile(false);
                    }}
                  >
                    <RiLoginCircleFill />
                    <span>Login</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Register button */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={() => {
                      setAuthType("register");
                      setOpenMobile(false);
                    }}
                  >
                    <LiaSignInAltSolid />
                    <span>Sign up</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
