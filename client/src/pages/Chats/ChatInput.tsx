import React, { useState, useEffect } from "react";
import socket from "../../config/sockets";
import send from "../../assets/icons/send.svg";
// import attach from "../../assets/icons/attach.svg";
// import emoji from "../../assets/icons/emoji.svg";
// import IndexedDB from "../../database/IndexedDB";
import { ref, push, set } from "firebase/database";

import { rtdb } from "../../firebase/firebase.config";
// import { MessagesProps } from "./Message";

const userName = JSON.parse(localStorage.getItem("username")!);

interface ChatInputProps {
  channelId: string;
  // messages: MessagesProps[];
  setMessages: (props: any) => any;
}

function ChatInput({ channelId, setMessages }: ChatInputProps) {
  const [isMessage, setIsMessage] = useState("");

  //USE MEMO JUST FOR NOTHING IMO
  // useMemo(() => [{ messages, setMessages }], [messages, setMessages]);

  const messageHandler = (e: any) => {
    e.preventDefault();
    const postListRef = ref(rtdb, channelId);
    const newPostRef = push(postListRef);

    if (isMessage === null || isMessage.trim() === "") return null;

    socket.emit("messaging", {
      channel_id: channelId,
      username: userName,
      newMessage: isMessage,
      date: new Date().toLocaleString(),
    });

    set(newPostRef, {
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
      setMessages((message: string) => [...message, data]);
    });
  }, [setMessages]);

  return (
    <>
      <form method='POST' id='chatInput' className='w-full'>
        <div className='bg-primary-light-100 w-full flex rounded-lg p-2 filter drop-shadow-md'>
          <input
            id='messageBody'
            className='bg-transparent w-full py-2 px-4  outline-none text-white'
            type='text'
            value={isMessage}
            onChange={(e) => {
              setIsMessage(e.target.value);
            }}
            placeholder='Enter to send message'
          />
          <div className='flex justify-around px-3 space-x-1'>
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
