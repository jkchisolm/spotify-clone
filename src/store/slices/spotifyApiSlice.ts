import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import SpotifyWebApi from "spotify-web-api-js";

interface ApiState {
  userAuthenticated: boolean;
  apiClient: SpotifyWebApi.SpotifyWebApiJs;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: ApiState = {
  userAuthenticated: false,
  apiClient: new SpotifyWebApi(),
};

export const spotifyApiSlice = createSlice({
  name: "spotifyApi",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.userAuthenticated = true;
      state.apiClient.setAccessToken(action.payload.accessToken);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setTokens } = spotifyApiSlice.actions;

export default spotifyApiSlice.reducer;
