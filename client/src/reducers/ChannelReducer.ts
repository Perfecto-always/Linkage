import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any[] = [];

const ChannelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    add_channel_name: (state, action: PayloadAction<any[]>) => {
      if (Array.isArray(action.payload)) return [...action.payload];
      return [...state, action.payload];
    },
  },
});

export const { add_channel_name } = ChannelSlice.actions;
export default ChannelSlice.reducer;
