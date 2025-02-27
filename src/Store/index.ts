import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./ChatSlice";
import navReducer from "./NavSlice";
import authReducer from "./AuthSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    nav: navReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
