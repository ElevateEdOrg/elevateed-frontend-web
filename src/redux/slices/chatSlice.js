import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [], // Store chat list
  messages: [], // Store messages per chat ID
  openChat: null,
  isWidgetOpen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setIsWidgetOpen: (state, action) => {
      state.isWidgetOpen = action.payload;
    },
    setOpenChat: (state, action) => {
      state.openChat = action.payload;
    },
  },
});

export const { setChats, setMessages, setIsWidgetOpen, setOpenChat } =
  chatSlice.actions;
export default chatSlice.reducer;
