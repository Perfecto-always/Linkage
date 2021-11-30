import { createSlice } from "@reduxjs/toolkit";

const initialState:boolean = false

const SpotifyLoggedSlice = createSlice({
    initialState,
    name:"spotify_logged_in",
    reducers:{
        spotify_logged:(state)=>{
            return state = true
        }
    }
})

export const {spotify_logged} = SpotifyLoggedSlice.actions
export default SpotifyLoggedSlice.reducer