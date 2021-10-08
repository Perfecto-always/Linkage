const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:8080",
    ],
    methods: ["GET", "POST"],
  },
});

//SOCKET IO WORK

// let channel = "";

io.on("connection", (socket, data) => {
  console.log("user connected");
  let channelId = "";

  socket.on("join_channel", (data) => {
    if (data === null) return;
    socket.join(data);
  });

  socket.on("messaging", ({ channel_id, username, newMessage, date }) => {
    // socket.join(channel_id);
    io.to(channel_id).emit("messaging", {
      username,
      newMessage,
      date,
      channel_id,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 2000;
httpServer.listen(PORT, () => {
  console.log("Server listning on port:" + PORT);
});
