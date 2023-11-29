import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/authSlice/page";

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
