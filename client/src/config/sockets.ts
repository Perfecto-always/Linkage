import { io } from "socket.io-client";

const SOCKET_IO_CONNECTION = "http://localhost:2000";

const socket = io(SOCKET_IO_CONNECTION, {
  autoConnect: false,
  reconnection: false,
});

export default socket;
