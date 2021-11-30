import React, { useState } from "react";
import axios from "axios";
// @ts-ignore
import { ModalFormProps } from "./ModalForm.tsx";
import { BACKEND_URL } from "../../config/config";

function Join({ setTrigger }: ModalFormProps) {
  const [channelId, setChannelId] = useState("");

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelId(e.target.value);
  };

  const channelCreator = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URL + "/chat/join/channel",
        { channelId },
        { withCredentials: true }
      )
      .then((res) => console.log(res))
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
        className='p-2 border bg-transparent rounded-md border-gray-500'
        placeholder='Invite link'
        value={channelId}
        onChange={inputHandle}
        autoComplete='off'
      />
      <button
        id='channelCreate'
        type='submit'
        onClick={channelCreator}
        className='py-2 px-3 rounded-md text-white bg-accent-0 hover:bg-accent-500 hover:text-white shadow-2xl transition-colors duration-300'
      >
        Join
      </button>
    </>
  );
}

export default Join;
