import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PlayerState {
  deviceId: string | null;
  currentTrack: Spotify.Track | null;
  trackStatus: {
    isPlaying: boolean;
    currentProgressMs?: number;
    shuffleState?: boolean;
    repeatState?: number;
    duration?: number;
    volume?: number;
  };
}

const initialState: PlayerState = {
  deviceId: null,
  currentTrack: null,
  trackStatus: {
    isPlaying: false,
    volume: 100,
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
    setTrackStatus: (
      state,
      action: PayloadAction<{
        isPlaying: boolean;
        shuffleState?: boolean;
        repeatState?: number;
        duration?: number;
        currentProgressMs?: number;
        volume?: number;
      }>
    ) => {
      state.trackStatus = action.payload;
      if (action.payload.shuffleState !== undefined) {
        state.trackStatus.shuffleState = action.payload.shuffleState;
      }
      if (action.payload.repeatState !== undefined) {
        state.trackStatus.repeatState = action.payload.repeatState;
      }
    },
  },
});

export const { setDeviceId, setCurrentTrack, setTrackStatus } =
  playerSlice.actions;

export default playerSlice.reducer;
