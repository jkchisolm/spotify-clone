import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PlayerState {
  deviceId: string | null;
  currentTrack: Spotify.Track | null;
}

const initialState: PlayerState = {
  deviceId: null,
  currentTrack: null,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setDeviceId: (state, action: PayloadAction<{ id: string }>) => {
      state.deviceId = action.payload.id;
    },
    setCurrentTrack: (state, action: PayloadAction<Spotify.Track>) => {
      state.currentTrack = action.payload;
    },
  },
});

export const { setDeviceId, setCurrentTrack } = playerSlice.actions;

export default playerSlice.reducer;
