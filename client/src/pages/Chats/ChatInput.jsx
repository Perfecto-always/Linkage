import React, { useState, useEffect, useMemo } from "react";
import socket from "../../config/sockets";
import send from "../../assets/icons/send.svg";
import attach from "../../assets/icons/attach.svg";
import emoji from "../../assets/icons/emoji.svg";
import IndexedDB from "../../database/IndexedDB";

const userName = JSON.parse(localStorage.getItem("username"));

function ChatInput({ channelId, messages, setMessages }) {
  const [isMessage, setIsMessage] = useState("");

  //USE MEMO JUST FOR NOTHING IMO
  useMemo(() => [{ messages, setMessages }], [messages, setMessages]);

  const onMessageChange = (e) => {
    setIsMessage(e.target.value);
  };

  const messageHandler = (e) => {
    e.preventDefault();

    if (isMessage === null || isMessage === "") return null;

    socket.emit("messaging", {
      channel_id: channelId,
      username: userName,
      newMessage: isMessage,
      date: new Date().toLocaleString(),
    });

    setIsMessage("");
  };

  onkeydown = (e) => {
    if (e.code === "Enter") {
      messageHandler(e);
    }
  };

  useEffect(() => {
    socket.on("messaging", (data) => {
      setMessages((message) => [...message, data]);
      IndexedDB(data.channel_id).add({
        username: data.username,
        newMessage: data.newMessage,
        date: data.date,
      });
    });
  }, [setMessages]);

  return (
    <>
      <form action='/messages' method='POST' id='chatInput' className='w-full'>
        <div className='bg-gray-700 w-full flex rounded-lg p-1'>
          <input
            id='messageBody'
            className='bg-transparent w-full py-2 px-4  outline-none text-white'
            type='text'
            value={isMessage}
            onChange={onMessageChange}
            placeholder='Enter to send message'
          />
          <div className='flex justify-around px-3 space-x-1'>
            <button>
              <img
                src={attach}
                alt='attach'
                className='hover:bg-gray-600 w-10 p-1 rounded-full'
              />
            </button>

            <button>
              <img
                src={emoji}
                alt='attach'
                className='hover:bg-gray-600 w-10 p-1 rounded-full'
              />
            </button>

            <button type='submit' onClick={messageHandler}>
              <img
                src={send}
                alt='send'
                className='hover:bg-gray-600 w-10 p-1 rounded-full'
              />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ChatInput;
