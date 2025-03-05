import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for the chat state
interface ChatState {
  chats: Array<{
    chat_id: string;
    created_at: string;
    user1_id: string;
    user2_id: string;
    user1_name: string;
    user1_avatar: string;
    user2_avatar: string;
    user2_name: string;
    last_message?: string;
    last_message_time?: string;
    has_unread_messages: boolean;
  }>;
  messages: Array<{
    message: string;
    message_id?: string;
    sender_id: string;
    sender_name?: string;
    sent_at: string;
    status?: string;
  }>;
  openChat: {
    id?: string;
    receiver_id: string;
    receiver_name: string;
    sender_id: string;
    sender_name: string;
    isNewChat: boolean;
  } | null;
  isWidgetOpen: boolean;
}

// Define the initial state with type
const initialState: ChatState = {
  chats: [],
  messages: [],
  openChat: null,
  isWidgetOpen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatState["chats"]>) => {
      state.chats = action.payload;
    },
    setMessages: (state, action: PayloadAction<ChatState["messages"]>) => {
      state.messages = action.payload;
    },
    setIsWidgetOpen: (state, action: PayloadAction<boolean>) => {
      state.isWidgetOpen = action.payload;
    },
    setOpenChat: (state, action: PayloadAction<ChatState["openChat"]>) => {
      state.openChat = action.payload;
    },
  },
});

export const { setChats, setMessages, setIsWidgetOpen, setOpenChat } =
  chatSlice.actions;

export default chatSlice.reducer;
