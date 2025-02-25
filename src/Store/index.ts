import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./ChatSlice";
import navReducer from "./NavSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    nav: navReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
