import React from "react";
import Spotify from "../../assets/company icons/spotify.svg";

function SpotifyAuth() {
  const authRedirect = () => {
    window.location = "http://localhost:8080/music/authorize/spotify";
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <button
        onClick={authRedirect}
        className='hover:bg-green-500 hover:text-black py-4 px-6 border-2 border-green-500 transition-all duration-300 ease-in-out rounded-md flex justify-center items-center'
      >
        <img src={Spotify} alt='' className='w-8 mr-2' />
        Login with Spotify
      </button>
    </div>
  );
}

export default SpotifyAuth;
