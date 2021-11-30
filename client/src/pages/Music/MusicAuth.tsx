import { useEffect, useState } from "react";
import SpotifyAuth from "./SpotifyAuth";
import Music from "./Music";
import { auth_code } from "../../reducers/SpotifyAuthCode";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

const auth = new URLSearchParams(window.location.search).get("code");

const MusicAuth = () => {
  const dispatch = useDispatch();
  const [AUTHORIZE_CODE] = useState(auth);
  const token: string = useSelector((state: RootStateOrAny) => state.spotify);

  useEffect(() => {
    dispatch(auth_code(AUTHORIZE_CODE));
  }, [AUTHORIZE_CODE, dispatch]);

  return !token ? <SpotifyAuth /> : <Music token={token} />;
};

export default MusicAuth;
