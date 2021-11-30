import { useEffect, useState } from "react";
import useSpotifyAuth from "../../hooks/useSpotifyAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSeachPlayer from "./TrackSeachPlayer";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { play_track } from "../../reducers/TrackReducer";

const spotifyApi = new SpotifyWebApi();

interface Props {
  token: string;
}

interface SearchResultProps {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}

function Music({ token }: Props) {
  const ACCESS_TOKEN = useSpotifyAuth(token);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultProps[]>([]);
  const playingTrack = useSelector((state: RootStateOrAny) => state.track);
  const [type, setType] = useState<string>();
  const [trackUri, setTrackUri] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ACCESS_TOKEN) return;
    const something = spotifyApi.setAccessToken(ACCESS_TOKEN);
    return something;
  }, [ACCESS_TOKEN]);

  useEffect(() => {
    if (!ACCESS_TOKEN) return;
    if (!search) return setSearchResults([]);

    const timeoutId = setTimeout(
      () =>
        spotifyApi
          .searchTracks(search)
          .then((res) => {
            setSearchResults(
              res.body.tracks!.items.map((track) => {
                const smallestAlbumImage = track.album.images.reduce(
                  (smallest, image) => {
                    if (image.height! < smallest.height!) return image;
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
          }),
      1000
    );

    return () => clearTimeout(timeoutId);
  }, [ACCESS_TOKEN, search]);

  const currentTrack = (track: SearchResultProps) => {
    dispatch(play_track(track));
    // useDispatch().setPlayingTrack(track);
  };

  useEffect(() => {
    if (Object.keys(playingTrack).length < 1) return;
    const uri = playingTrack.uri;
    const destructuredUri = uri.split(":");

    // const spotify = destructuredUri[0];
    setType(destructuredUri[1]);
    setTrackUri(destructuredUri[2]);
  }, [playingTrack]);

  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='w-full flex py-4 px-6 shadow-xl'>
        <input
          type='search'
          placeholder='Search for music or artist'
          className='w-1/5 text-black px-8 py-2 rounded-full outline-none'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
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
            // @ts-ignore
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
export type { SearchResultProps };
