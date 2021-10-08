import React, { useEffect, useState } from "react";
import UseSpotifyAuth from "../../hooks/useSpotifyAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSeachPlayer from "./TrackSeachPlayer";

const spotifyApi = new SpotifyWebApi();

function Music({ token }) {
  const TOKEN = UseSpotifyAuth(token);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [type, setType] = useState();
  const [trackUri, setTrackUri] = useState();

  useEffect(() => {
    if (!TOKEN) return;
    spotifyApi.setAccessToken(TOKEN);
  }, [TOKEN]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!TOKEN) return;

    let cancel = false;
    spotifyApi
      .searchTracks(search)
      .then((res) => {
        if (cancel) return;
        setSearchResults(
          res.body.tracks.items.map((track) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });

    return () => (cancel = true);
  }, [search, TOKEN]);

  const currentTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (!playingTrack) return;

    const uri = playingTrack.uri;
    const destructuredUri = uri.split(":");

    // const spotify = destructuredUri[0];
    setType(destructuredUri[1]);
    setTrackUri(destructuredUri[2]);
  }, [playingTrack]);

  return (
    <div className='flex flex-col w-full h-screen '>
      <div className='w-full flex py-4 px-6 shadow-xl'>
        <input
          type='search'
          placeholder='Search for music or artist'
          className='w-1/5 text-black px-8 py-2 rounded-full outline-none'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='overflow-scroll flex-col space-y-2 p-8 search-container scroll-hidden flex-grow'>
        {searchResults.map((track) => (
          <TrackSeachPlayer
            track={track}
            currentTrack={currentTrack}
            key={track.uri}
          />
        ))}
      </div>
      <div className='flex justify-center items-center'>
        {!type || !trackUri ? null : (
          <iframe
            src={`https://open.spotify.com/embed/${type}/${trackUri}`}
            style={{ width: "100%" }}
            height='80'
            frameBorder='0'
            allowtransparency='true'
            allow='autoplay; encrypted-media'
            title='spotify_embbed'
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default Music;
