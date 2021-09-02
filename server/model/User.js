const mongoose = require("mongoose");
const Channel = require("../model/Channel");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      max: 256,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 1024,
    },
    channelData: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
