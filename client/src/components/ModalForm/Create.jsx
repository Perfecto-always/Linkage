import React, { useState } from "react";
import axios from "axios";

function Create({ setTrigger, fetchData }) {
  const [channelName, setChannelName] = useState("");

  const channelCreator = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/chat/create/channel",
        { channelName },
        { withCredentials: true }
      )
      .then((res) => fetchData())
      .catch(function (error) {
        console.log(error);
      });
    // fetchData();
    setTrigger(false);
    setChannelName("");
  };

  return (
    <>
      <label htmlFor='channelName' className='font-medium'>
        Create channel:
      </label>
      <input
        type='text/number'
        id='channelName'
        name='channelName'
        className='p-2 border rounded-md border-gray-500'
        placeholder='Enter the channel name'
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        id='channelCreate'
        type='submit'
        onClick={channelCreator}
        className='bg-pink-800 py-2 px-3 rounded-md text-white hover:bg-pink-900 shadow-2xl transition-colors duration-300 '
      >
        Create
      </button>
    </>
  );
}

export default Create;
