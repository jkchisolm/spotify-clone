import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slices/spotifyApiSlice";
import playerReducer from "./slices/playerSlice";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    spotifyApi: apiReducer,
    player: playerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
