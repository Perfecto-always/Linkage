import Spotify from "../../assets/company icons/spotify.svg";
import { BACKEND_URL } from "../../config/config";

function SpotifyAuth() {
  const authRedirect = () => {
    window.location.href = BACKEND_URL + "/music/authorize/spotify";
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <button
        onClick={authRedirect}
        className='hover:bg-green-500 text-white py-4 px-6 border-2 border-green-500 transition-all duration-300 ease-in-out rounded-md flex justify-center items-center'
      >
        <img src={Spotify} alt='' className='w-8 mr-2' />
        Login with Spotify
      </button>
    </div>
  );
}

export default SpotifyAuth;
