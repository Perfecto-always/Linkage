import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Members from "./Members";
import NoMessages from "./NoMessages";
import Message from "./Message";
import ChatInput from "./ChatInput";
import socket from "../../config/sockets";
// import IndexedDB from "../../database/IndexedDB";
import { get, ref, query, limitToLast, orderByChild } from "firebase/database";
import { rtdb } from "../../firebase/firebase.config";
import { MessageProps } from "./Message";

socket.connect();
socket.on("connect", () => {});
// const dbRef = ref(rtdb);

interface Props {
  channelId: string;
}

function Messages({ channelId }: Props) {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useLayoutEffect(() => {
    const recentPostsRef = query(
      ref(rtdb, channelId),
      orderByChild("date"),
      limitToLast(25)
    );
    get(recentPostsRef).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((docs) => {
          setMessages((prev: any) => [...prev, docs.val()]);
        });
      }
    });
  }, [channelId]);

  // useEffect(() => {
  //   IndexedDB(channelId)
  //     .get()
  //     .then((data) => setMessages(data));
  // }, [channelId]);

  useEffect(() => {
    if (!channelId) return;

    socket.emit("join_channel", channelId);
    return () => {
      // clearInterval(timeoutId);
      socket.emit("leave_channel", channelId);
    };
  }, [channelId]);

  useMemo(() => ({ messages, setMessages }), [messages, setMessages]);

  return (
    <>
      <div className='flex flex-grow flex-col w-2/4 bg-primary-0'>
        <div className='flex-grow w-full overflow-y-auto scroll-hidden text-white py-2'>
          {messages.length === 0 ? (
            <NoMessages />
          ) : (
            <Message messages={messages} />
          )}
        </div>
        <div className='flex mb-5 space-x-3 mx-4'>
          <ChatInput channelId={channelId} setMessages={setMessages} />
        </div>
      </div>
      <Members channelId={channelId} />
    </>
  );
}

export default Messages;
