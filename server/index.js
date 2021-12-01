//IMPORTS
const express = require("express");
const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");

//IMPORT DEPENDENTS
//USING CORS, COOKIE PARSER, BODY-PARSER
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: [
            "http://localhost:3000",
            "http://localhost:5000",
            "https://praline.netlify.app",
        ],
    })
);
app.use(helmet());
app.use(compression());

//INCLUDES DEVELOPMENT BUILD
// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "..", "client", "build"));
// });

//ROUTES IMPORT
const authRoute = require("./routes/auth");
const chatRoute = require("./routes/chat");
const musicRoute = require("./routes/music");

dotenv.config({ path: __dirname + "/.env" });

//MIDDLEWARE
app.use(express.json());

//CONNECTION TO DB
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) console.log(err);
        console.log("Server connected to MongoDB");
    }
);
mongoose.set("useFindAndModify", false);

//ROUTES MIDDLEWARE
app.use("/api/user", authRoute);
app.use("/chat", chatRoute);
app.use("/music", musicRoute);

const PORT = 8080;
app.listen(PORT, () =>
    console.log(`Listening on port: http://localhost:${PORT}`)
);