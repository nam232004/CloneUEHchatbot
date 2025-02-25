import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chat {
  id: string;
  title: string;
  content: string;
}

interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: []
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
    removeChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter(chat => chat.id !== action.payload);
    }
  }
});

export const { addChat, removeChat } = chatSlice.actions;
export default chatSlice.reducer;
