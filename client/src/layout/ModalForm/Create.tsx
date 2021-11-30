import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add_channel_name } from "../../reducers/ChannelReducer";
// @ts-ignore
import { ModalFormProps } from "./ModalForm.tsx";
import { BACKEND_URL } from "../../config/config";

function Create({ setTrigger }: ModalFormProps) {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState("");

  const channelCreator = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    axios
      .post(
        BACKEND_URL + "/chat/create/channel",
        { channelName },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(add_channel_name(res.data));
      })
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
        className='p-2 border rounded-md border-gray-500 bg-transparent'
        placeholder='Channel Name'
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        autoComplete='off'
      />
      <button
        id='channelCreate'
        type='submit'
        onClick={channelCreator}
        className='py-2 px-3 rounded-md text-white bg-accent-0 hover:bg-accent-500 hover:text-white shadow-2xl transition-colors duration-300'
      >
        Create
      </button>
    </>
  );
}

export default Create;
