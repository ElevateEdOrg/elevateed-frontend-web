import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    id: null,
    full_name: "",
    email: "",
    role: "",
  },
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
      state.userInfo = { id: null, full_name: "", email: "", role: "" };
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
