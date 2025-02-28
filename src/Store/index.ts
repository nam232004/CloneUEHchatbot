import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./ChatSlice";
import navReducer from "./NavSlice";
import authReducer from "./AuthSlice";
import agentsReducer from "./AgentsSlice";
import userReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    nav: navReducer,
    auth: authReducer,
    agents: agentsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
