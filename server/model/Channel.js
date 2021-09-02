const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
    },
    userName: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Channel", channelSchema);
