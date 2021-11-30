import { useEffect } from "react";
import axios from "axios";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  spotify_access,
  spotify_refresh,
} from "../reducers/SpotifyAccessReducer";
import useInterval from "../hooks/useInterval";
import { spotify_logged } from "../reducers/SpotifyLogged";
import { BACKEND_URL } from "../config/config";

function useSpotifyAuth(token: string) {
  const accessToken = useSelector(
    (state: RootStateOrAny) => state.spotify_access.accessToken
  );
  const refreshToken = useSelector(
    (state: RootStateOrAny) => state.spotify_access.refreshToken
  );
  const expiresIn = useSelector(
    (state: RootStateOrAny) => state.spotify_access.expiresIn
  );
  const dispatch = useDispatch();
  const SpotifyLoggedIn: boolean = useSelector(
    (state: RootStateOrAny) => state.spotify_logged_in
  );

  // Function to refresh tokens
  const getSpotifyData = () =>
    axios
      .post(BACKEND_URL + "/music/refresh/spotify", {
        refreshToken,
        accessToken,
      })
      .then((res) => {
        dispatch(spotify_refresh({ ...res.data, refreshToken }));
      });

  useEffect(() => {
    if (!SpotifyLoggedIn) return;
    getSpotifyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SpotifyLoggedIn]);

  useEffect(() => {
    if (!token) return;
    if (SpotifyLoggedIn) return;
    axios
      .post(BACKEND_URL + "/music/access/spotify", { token })
      .then((res) => {
        // @ts-ignore
        window.history.pushState({}, null, "/music");
        dispatch(spotify_access(res.data));
        dispatch(spotify_logged());
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  useInterval(() => {
    if (!refreshToken || !expiresIn) return;
    getSpotifyData();
  }, expiresIn * 1000 - 100000);

  return accessToken;
}

export default useSpotifyAuth;
