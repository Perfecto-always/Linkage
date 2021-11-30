import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface action {
    accessToken: string,
    refreshToken: string,
    expiresIn: number
}

const initialState = {} as action

const SpotifyAccessSlice = createSlice({
    name:"spotify_access_token",
    initialState,
    reducers:{
        spotify_access:(state, action: PayloadAction<action>)=>{
           return action.payload
    },
        spotify_refresh:(state, action: PayloadAction<action>)=>{
            return action.payload
        }
}
})


export const {spotify_access, spotify_refresh} = SpotifyAccessSlice.actions
export default SpotifyAccessSlice.reducer