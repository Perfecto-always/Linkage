import React from "react";

function TrackSeachPlayer({ track, currentTrack }) {
  const handlePlay = () => {
    currentTrack(track);
  };

  return (
    <div
      className='cursor-pointer flex  items-center w-2/5 hover:bg-gray-700 rounded-md p-3'
      value={track.uri}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} alt='' className='rounded-sm w-10 h-10' />
      <div className='ml-4'>
        <h5>{track.title}</h5>
        <p>{track.artist}</p>
      </div>
    </div>
  );
}

export default TrackSeachPlayer;
