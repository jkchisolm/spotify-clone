import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PlayerState {
  deviceId: string | null;
  currentTrack: Spotify.Track | null;
  trackStatus: {
    isPlaying: boolean;
  };
}

const initialState: PlayerState = {
  deviceId: null,
  currentTrack: null,
  trackStatus: {
    isPlaying: false,
  },
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
    setTrackStatus: (state, action: PayloadAction<{ isPlaying: boolean }>) => {
      state.trackStatus = action.payload;
    },
  },
});

export const { setDeviceId, setCurrentTrack, setTrackStatus } =
  playerSlice.actions;

export default playerSlice.reducer;
