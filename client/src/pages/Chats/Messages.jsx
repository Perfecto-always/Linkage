import React, { useEffect, useMemo, useState } from "react";
import Members from "./Members";
import NoMessages from "./NoMessages";
import Message from "./Message";
import ChatInput from "./ChatInput";
import socket from "../../config/sockets";
import IndexedDB from "../../database/IndexedDB";

function Messages({ channelId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    IndexedDB(channelId)
      .get()
      .then((data) => setMessages(data));
  }, [channelId]);

  useEffect(() => {
    if (!channelId) return;
    socket.connect();
    socket.on("connect", () => {
      socket.emit("join_channel", channelId);
    });
    return () => {
      channelId = null;
      socket.disconnect();
    };
  }, []);

  useMemo(() => ({ messages, setMessages }), [messages, setMessages]);

  return (
    <>
      <div className='flex flex-grow flex-col w-2/4 bg-gray-800'>
        <div className='flex-grow w-full overflow-y-auto scroll-hidden text-white py-2'>
          {messages.length === 0 ? (
            <NoMessages />
          ) : (
            <Message messages={messages} />
          )}
        </div>
        <div className='flex mb-5 space-x-3 mx-4'>
          <ChatInput
            channelId={channelId}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
      <Members channelId={channelId} />
    </>
  );
}

export default Messages;
