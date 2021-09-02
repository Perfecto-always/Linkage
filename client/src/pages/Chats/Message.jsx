import React from "react";

function Message({ messages }) {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className='mx-2 rounded-md p-2 hover:bg-gray-700 tracking-wide '
        >
          <div className='font-bold text-gray-200 cursor-pointer'>
            {message.username}
          </div>
          <div className='text-gray-300 '>{message.newMessage}</div>
        </div>
      ))}
    </>
  );
}

export default Message;
