import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, Chat, ChatHistory } from "../Components/Types/Chat";

const initialState: ChatState = {
  chatHistories: [],
  currentChatId: null
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createNewChat: (state) => {
      const newChat: ChatHistory = {
        id: Date.now().toString(),
        title: "Cuộc trò chuyện mới",
        messages: [],
        timestamp: Date.now()
      };
      state.chatHistories.unshift(newChat);
      state.currentChatId = newChat.id;
    },
    addMessage: (state, action: PayloadAction<{ chatId: string; message: Chat }>) => {
      const chat = state.chatHistories.find(c => c.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
        // Cập nhật title nếu là tin nhắn đầu tiên từ user
        if (chat.title === "Cuộc trò chuyện mới" && action.payload.message.sender === 'user') {
          chat.title = action.payload.message.message.slice(0, 30) + (action.payload.message.message.length > 30 ? "..." : "");
        }
      }
    },
    removeChat: (state, action: PayloadAction<string>) => {
      state.chatHistories = state.chatHistories.filter(chat => chat.id !== action.payload);
      if (state.currentChatId === action.payload) {
        state.currentChatId = state.chatHistories[0]?.id || null;
      }
    },
    setCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    }
  }
});

export const { createNewChat, addMessage, removeChat, setCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;