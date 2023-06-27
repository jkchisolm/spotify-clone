import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
