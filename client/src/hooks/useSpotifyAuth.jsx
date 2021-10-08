import { useState, useEffect } from "react";
import axios from "axios";

function UseSpotifyAuth(token) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:8080/music/access/spotify", { token })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/music");
      });
  }, [token]);

  useEffect(() => {});

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      // refreshAccess();
      axios
        .post("http://localhost:8080/music/refresh/spotify", {
          refreshToken,
        })
        .then((res) => {
          console.log(res.data);
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}

export default UseSpotifyAuth;
