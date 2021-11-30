import React from "react";
import TimeAgo from "timeago-react";

interface MessageProps {
  username: string;
  newMessage: string;
  date: string;
}

interface MessagesProps {
  messages: MessageProps[];
}

function Message({ messages }: MessagesProps) {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className='mx-2 rounded-sm p-3 hover:bg-primary-100 tracking-wide relative'
        >
          <div className='font-bold text-gray-200 cursor-pointer'>
            {message.username}
          </div>
          <div className='text-gray-300 break-words max-w-5xl'>
            {message.newMessage}
          </div>
          <TimeAgo
            datetime={message.date}
            className='text-gray-500 text-xs right-4 bottom-2 absolute '
            live={false}
          />
        </div>
      ))}
    </>
  );
}

export type { MessagesProps, MessageProps };
export default Message;
