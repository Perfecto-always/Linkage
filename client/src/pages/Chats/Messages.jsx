import React, { useMemo, useState } from "react";
import Members from "./Members";
import NoMessages from "./NoMessages";
import Message from "./Message";
import ChatInput from "./ChatInput";

function Messages({ channelId }) {
  const [messages, setMessages] = useState([]);

  useMemo(() => ({ messages, setMessages }), [messages, setMessages]);

  return (
    <>
      <div className='flex flex-grow flex-col bg-gray-800'>
        <div className='flex-grow overflow-auto scroll-hidden text-white'>
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
      <Members />
    </>
  );
}

export default Messages;
