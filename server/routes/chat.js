const router = require("express").Router();
const Channel = require("../model/Channel");
const { User } = require("../model/User");
// const { Private } = require("../model/User");
const authenticate = require("../middleware/authenticate");

router.use(authenticate);
//Checking authentication and then giving access
router.get("/", (req, res) => {});

//SENDING CHATDATA
router.get("/channel", async(req, res) => {
    if (req.userIdParams === null || req.userIdParams === undefined)
        return res.status(400).send({ message: "User id not present" });
    await User.findById({ _id: req.userIdParams }, { channelData: 1 })
        .lean()
        .then((response) => {
            if (!response || response.channelData.length === 0) return;
            res.status(200).send(response.channelData);
        });
});

//CREATEING CHANNELS
router.post("/create/channel", async(req, res, next) => {
    const channel = new Channel({
        channelName: req.body.channelName,
        userName: req.userIdParams,
    });

    try {
        await channel.save(async function(err, data) {
            if (err) {
                console.log(err);
            } else {
                let channelId = data._id;
                let channelName = data.channelName;
                const userChannel = await User.findById({ _id: req.userIdParams }, { password: 0 });
                userChannel.updateOne({
                        $push: { channelData: { channelId, channelName } },
                    },
                    function(err, data) {
                        if (err) return res.status(500).send(err);
                    }
                );
                res.status(200).send({ channelId, channelName });
            }
            next();
        });
    } catch (err) {
        console.log(err);
    }
});

//JOINING CHANNELS
router.put("/join/channel", async(req, res, next) => {
    if (!req.body.channelId) return;
    const invite_url = new URL(req.body.channelId).searchParams;
    const id = invite_url.get("invite");
    const joinChannel = await Channel.findById({ _id: id });

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
            // Earlier this used push
            $push: { userName: req.userIdParams },
        });
        await User.findOneAndUpdate({
            _id: req.userIdParams,
        }, {
            // Earlier this used push
            $set: {
                channelData: { channelId: idOfChannel, channelName: nameOfChannel },
            },
        });
        res.status(200).send({ message: "Joined" });
        next();
    } catch (err) {
        console.log(err);
    }
});

//SENDING MEMBERS DATA OF A CHANNEL
router.get("/:channelId/members", async(req, res, next) => {
    const channelId = req.params.channelId;

    const members = await Channel.findOne({ _id: channelId }).lean();
    if (members === null) return res.status(400).send("error");
    const membersId = members.userName;

    const membersName = await User.find({ _id: membersId }, { username: 1 }).lean();

    res.status(200).send(membersName);

    next();
});

//DELETE CHANNEL
router.delete("/delete/channel", async(req, res) => {
    const _id = req.body.channel_id;

    // checking if the id is not null or a whitespace
    if (!_id || _id === null || _id.trim() === "")
        return res.status(400).send({ message: "Invalid Channel Id" });
    const response = await Channel.findByIdAndDelete(_id);

    // checking if the Channel Id exists
    if (response === null || response === undefined)
        return res
            .status(400)
            .send({ error: "Cannot find the channel with the given Id." });
    // finding the users in the db and then deleting its reference

    const available_memebers = response.userName;
    await User.updateMany({
            _id: { $in: available_memebers },
        }, {
            $pull: {
                channelData: {
                    channelId: _id,
                },
            },
        }, { safe: true, multi: true },
        function(err) {
            if (err) return console.log(err);
            res.status(200).send({ message: "Channel Deleted" });
        }
    );
});

module.exports = router;