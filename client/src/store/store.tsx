import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
// REDUCERS IMPORTS
import ChannelSlice from "../reducers/ChannelReducer";
import SpotifyAuthCodeSlice from "../reducers/SpotifyAuthCode";
import TrackSlice from "../reducers/TrackReducer";
import SpotifyAccessSlice from "../reducers/SpotifyAccessReducer";
import SpotifyLoggedSlice from "../reducers/SpotifyLogged";

const reducers = combineReducers({
  channel: ChannelSlice,
  spotify: SpotifyAuthCodeSlice,
  track: TrackSlice,
  spotify_access: SpotifyAccessSlice,
  spotify_logged_in: SpotifyLoggedSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["track"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
