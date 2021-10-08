const router = require("express").Router();
const Channel = require("../model/Channel");
const User = require("../model/User");
const authenticate = require("../middleware/authenticate");
// const userIdParams = require("../middleware/authenticate");

router.use(authenticate);
//Checking authentication and then giving access
router.get("/", (req, res) => {});

//SENDING CHATDATA
router.get("/channel", async (req, res) => {
  const CHANNEL_NAME = await User.findById(
    { _id: req.userIdParams },
    { channelData: 1 }
  );

  res.send(CHANNEL_NAME.channelData);
});

//CREATEING CHANNELS
router.post("/create/channel", async (req, res, next) => {
  const channel = new Channel({
    channelName: req.body.channelName,
    userName: req.userIdParams,
  });

  try {
    await channel.save(async function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let channelId = data._id;
        let channelName = data.channelName;
        const userChannel = await User.findById(
          { _id: req.userIdParams },
          { password: 0 }
        );
        userChannel.updateOne(
          {
            $push: { channelData: { channelId, channelName } },
          },
          function (err, data) {
            if (err) return res.status(500).send(err);
          }
        );
        res.status(200).send({ message: "Channel Created" });
      }
      next();
    });
  } catch (err) {
    console.log(err);
  }
});

//JOINING CHANNELS
router.put("/join/channel", async (req, res, next) => {
  const joinChannel = await Channel.findById({ _id: req.body.channelId });

  //RESOURCES DERIVED FROM THE ABOVE DATA SOURCE
  const nameOfChannel = joinChannel.channelName;
  const idOfChannel = joinChannel._id;
  const userOfChannel = joinChannel.userName;

  //CHECKING WETHER THE USER HAD JOINED THE CHANNEL
  const userExists = userOfChannel.includes(req.userIdParams);

  if (userExists) {
    return res.status(400).send({ message: "Already Joined" });
  }

  //IF NOT JOINED SAVNIG IT TO DATABASE
  try {
    await joinChannel.updateOne({
      $push: { userName: req.userIdParams },
    });
    await User.findOneAndUpdate(
      {
        _id: req.userIdParams,
      },
      {
        $push: {
          channelData: { channelId: idOfChannel, channelName: nameOfChannel },
        },
      }
    );
    res.status(200).send({ message: "Joined" });
    next();
  } catch (err) {
    console.log(err);
  }
});

//SENDING MEMBERS IN CHANNEL
router.get("/:channelId/members", async (req, res, next) => {
  const channelId = req.params.channelId;

  const members = await Channel.findById(channelId);
  const membersId = members.userName;

  const membersName = await User.find({ _id: membersId }, { username: 1 });

  res.status(200).send(membersName);

  next();
});

//DELETE CHANNEL
router.delete("/delete/channel", (req, res) => {});

module.exports = router;
