import React, { useState } from "react";
import axios from "axios";

function Join({ setTrigger, fetchData }) {
  const [channelId, setChannelId] = useState("");

  const inputHandle = (e) => {
    setChannelId(e.target.value);
  };

  const channelCreator = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:8080/chat/join/channel",
        { channelId },
        { withCredentials: true }
      )
      .then((res) => fetchData())
      .catch(function (error) {
        console.log(error);
      });
    // fetchData();
    setTrigger(false);
    setChannelId("");
  };

  return (
    <>
      <label htmlFor='channelName' className='font-medium'>
        Join channel:
      </label>
      <input
        type='text/number'
        id='channelName'
        name='channelName'
        className='p-2 border rounded-md border-gray-500'
        placeholder='Enter the channel id'
        value={channelId}
        onChange={inputHandle}
        required
      />
      <button
        id='channelCreate'
        type='submit'
        onClick={channelCreator}
        className={`bg-pink-800 py-2 px-3 rounded-md text-white hover:bg-pink-900 shadow-2xl transition-colors duration-300 `}
      >
        Join
      </button>
    </>
  );
}

export default Join;
