import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResultProps } from "../pages/Music/Music";

const initialState = {} as SearchResultProps;

const TrackSlice = createSlice({
  initialState,
  name: "tracks",
  reducers: {
    play_track: (state, action: PayloadAction<SearchResultProps>) => {
      // console.log(action.payload);
      return action.payload;
    },
  },
});

export const { play_track } = TrackSlice.actions;
export default TrackSlice.reducer;
