import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import SpotifyWebApi from "spotify-web-api-js";

interface ApiState {
  userAuthenticated: boolean;
  apiClient: SpotifyWebApi.SpotifyWebApiJs;
  refreshToken?: string;
}

const initialState: ApiState = {
  userAuthenticated: false,
  apiClient: new SpotifyWebApi(),
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.userAuthenticated = true;
      state.apiClient.setAccessToken(action.payload.accessToken);
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setTokens } = apiSlice.actions;

export default apiSlice.reducer;
