import { AuthStates } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userInfo: {
    id: string | null;
    full_name: string;
    email: string;
    role: string;
    avatar: string;
  };
  isLoggedIn: boolean;
  authState: AuthStates | null;
}

const initialState: UserState = {
  userInfo: {
    id: null,
    full_name: "",
    email: "",
    role: "",
    avatar: "",
  },
  authState: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userInfo = {
        id: null,
        full_name: "",
        email: "",
        role: "",
        avatar: "",
      };
      state.isLoggedIn = false;
    },
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
  },
});

export const { login, logout, setAuthState } = userSlice.actions;
export default userSlice.reducer;
