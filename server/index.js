//IMPORTS
const express = require("express");
const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require("path");

//IMPORT DEPENDENTS
//USING CORS, COOKIE PARSER
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//INCLUDES DEVELOPMENT BUILD
// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "..", "client", "build"));
// });

//ROUTES IMPORT
const authRoute = require("./routes/auth");
const chatRoute = require("./routes/chat");

dotenv.config({ path: __dirname + "/.env" });

//MIDDLEWARE
app.use(express.json());

//CONNECTION TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    console.log("Server connected to MongoDB");
  }
);
mongoose.set("useFindAndModify", false);

//ROUTES MIDDLEWARE
app.use("/api/user", authRoute);
app.use("/chat", chatRoute);

//SOCKET IO WORK
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const chatNsp = io.of("/chat/channel");

// let channel = "";

chatNsp.on("connection", (socket) => {
  console.log("A User Connected");

  socket.on("send_message", (msg) => {
    const channelId = msg.channel_id;
    socket.join(channelId);
    chatNsp.in(channelId).emit("recieve_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = 8080;
server.listen(PORT, () =>
  console.log(`Listening on port: http://localhost:${PORT}`)
);
