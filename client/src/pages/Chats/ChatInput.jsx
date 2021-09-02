import React, { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import SOCKET_IO_CONNECTION from "../../config/urls";

const sockets = io(SOCKET_IO_CONNECTION);
const userName = JSON.parse(localStorage.getItem("username"));

function ChatInput({ channelId, messages, setMessages }) {
  const [isMessage, setIsMessage] = useState("");

  useMemo(() => [{ messages, setMessages }], [messages, setMessages]);

  const onMessageChange = (e) => {
    setIsMessage(e.target.value);
  };

  const messageHandler = (e) => {
    e.preventDefault();

    if (isMessage === null || isMessage === "") return null;

    sockets.emit("send_message", {
      username: userName,
      newMessage: isMessage,
      channel_id: channelId,
    });

    setIsMessage("");
  };

  onkeydown = (e) => {
    if (e.code === "Enter") {
      messageHandler(e);
    }
  };

  useEffect(() => {
    sockets.on("recieve_message", (data) => {
      messages.push(data);
      setMessages([...messages]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <input
        className='bg-gray-700 w-full p-3 rounded-lg outline-none text-white'
        type='text'
        value={isMessage}
        onChange={onMessageChange}
        placeholder='Enter to send message'
      />
      <button
        type='submit'
        className='bg-pink-700 duration-300 hover:bg-pink-800 p-4 rounded-lg'
        onClick={messageHandler}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-cursor-fill'
          viewBox='0 0 16 16'
        >
          <path d='M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z' />
        </svg>
      </button>
    </>
  );
}

export default ChatInput;
