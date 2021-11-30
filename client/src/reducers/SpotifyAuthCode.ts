import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const SpotifyAuthCodeSlice = createSlice({
  name: "spotify_auth_code",
  initialState,
  reducers: {
    auth_code: (state, action: PayloadAction<string | null>) => {
      if (!action.payload) return state;
      return action.payload;
    },
  },
});

export const { auth_code } = SpotifyAuthCodeSlice.actions;
export default SpotifyAuthCodeSlice.reducer;
