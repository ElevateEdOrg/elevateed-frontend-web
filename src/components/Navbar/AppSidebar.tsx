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
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/userSlice";

// Menu items.
interface AppSidebarProps {
  authType: AuthStates | null;
  setAuthType: Dispatch<SetStateAction<AuthStates | null>>;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ setAuthType }) => {
  const { setOpenMobile } = useSidebar();
  const state = useSelector((state: RootState) => state);
  const { user } = state;
  const dispatch = useDispatch();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
        <SidebarGroup className="flex flex-col gap-20">
          <SidebarGroupLabel>
            <div className="w-full mt-10">
              <img className="w-1/2" src="./logo.png" alt="ElevateEd Logo" />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <IoMdHome />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {user.isLoggedIn ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/">
                        <IoMdCart />
                        <span>Cart</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/profile">
                        <IoIosBookmarks />
                        <span>My Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <button
                    onClick={() => dispatch(logout())}
                    className="border-t border-black py-2 cursor-pointer hover:text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
