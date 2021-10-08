import React from "react";
import SpotifyAuth from "../../components/AuthButtons/SpotifyAuth";
import Music from "./Music";

const AUTHORIZE_CODE = new URLSearchParams(window.location.search).get("code");

const MusicAuth = () => {
  return AUTHORIZE_CODE ? <Music token={AUTHORIZE_CODE} /> : <SpotifyAuth />;
};

export default MusicAuth;
