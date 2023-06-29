import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slices/spotifyApiSlice";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    spotifyApi: apiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
