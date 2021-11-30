const mongoose = require("mongoose");
// const Channel = require("../model/Channel");

const channelSchema = mongoose.Schema(
  {
    channelId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    channelName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: false }
);

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
    isActive: {
      type: Boolean,
      default: false,
    },
    channelData: [channelSchema],
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);
// var Channel = mongoose.model("Channel", channelSchema);
// var Private = mongoose.model("Privates", privateSchema);

module.exports = {
  User,
  // Channel,
  // Private,
};
