import { io } from "socket.io-client";

const SOCKET_IO_CONNECTION = "https://praline-websocket.herokuapp.com";

const socket = io(SOCKET_IO_CONNECTION, {
  autoConnect: false,
  reconnection: false,
});

export default socket;
