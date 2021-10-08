const router = require("express").Router();
const SpotifyWebApi = require("spotify-web-api-node");

//ASKING USER ACCESS TO GET AUTHORIZATION CODE FROM SPOTIFY
router.get("/authorize/spotify", (req, res, next) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/music&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
  );
});

//AFTER GETTING AUTH CODE NOW ASKING FOR AN ACCESS TOKEN
//FROM SPOTIFY
router.post("/access/spotify", (req, res) => {
  const AUTH_CODE = req.body.token;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  spotifyApi
    .authorizationCodeGrant(AUTH_CODE)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error) => res.status(400).send(error));
});

//GETTING A REFRESH TOKEN EVERYTIME BEFORE THE EXPIRATION OF
// ACCESS TOKEN SINCE IT ONLY LAST OF 60 SECONDS
router.post("/refresh/spotify", (req, res) => {
  const REFRESH_TOKEN = req.body.refreshToken;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken: REFRESH_TOKEN,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;
