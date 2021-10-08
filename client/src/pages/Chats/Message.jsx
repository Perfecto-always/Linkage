import React from "react";
import TimeAgo from "timeago-react";

//SERVICEWORKERS
// const messageChannel = new MessageChannel();

// navigator.serviceWorker.ready
//   .then(function (serviceWorkerRegistration) {
//     // Let's see if you have a subscription already
//     return serviceWorkerRegistration.pushManager.getSubscription();
//   })
//   .then(function (subscription) {
//     if (!subscription) {
//       console.log(
//         "Subscription failed please contact developers to fix this issue!"
//       );
//     }
//     // You have subscription.
//     // Send data to service worker

//     // First we initialize the channel by sending
//     // the port to the Service Worker (this also
//     // transfers the ownership of the port)
//     navigator.serviceWorker.controller.postMessage(
//       {
//         type: "INIT_PORT",
//       },
//       [messageChannel.port2]
//     );

//     // Listen to the response
//     messageChannel.port1.onmessage = (event) => {
//       // Print the result
//       console.log(event.data.payload);
//     };

//     // Then we send our first message
//     navigator.serviceWorker.controller.postMessage({
//       type: "SEND_MESSAGE_OFFLINE",
//     });
//   });


function Message({ messages }) {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className='mx-2 rounded-md p-2 hover:bg-gray-700 tracking-wide relative'
        >
          <div className='font-bold text-gray-200 cursor-pointer'>
            {message.username}
          </div>
          <div className='text-gray-300 break-words max-w-4xl'>
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

export default Message;
