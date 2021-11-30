const router = require("express").Router();
const { User } = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../functions/userVadlid");
const authenticate = require("../middleware/authenticate");

//REGISTER USER
router.post("/register", async (req, res) => {
  //CHECKING WHETHER THE CREDENTIALS MATCH
  const { error } = registerValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({ auth: false, message: error.details[0].message });

  //CHECKING USER IN DATABASE
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res
      .status(400)
      .send({ auth: false, message: `${req.body.email} already in use!` });

  //HASHING PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //CREATING NEW USER
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  //SAVING USER
  try {
    await user.save();
    res.send({ auth: true, message: `Registered ${user.username}` });
  } catch (err) {
    res.status(400).send({ auth: false, message: err });
  }
});

//LOGIN USER
router.post("/login", async (req, res) => {
  //CHECKING WHETHER THE CREDENTIALS MATCH
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({ auth: false, message: error.details[0].message });

  //CHECKING USER IN DATABASE
  const userExists = await User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        isActive: true,
      },
    }
  );
  if (!userExists)
    return res
      .status(404)
      .send({ auth: false, message: "No email found or exists" });
  //COMPARING THE PASSWORD ENTERED
  const validPassword = await bcrypt.compare(
    req.body.password,
    userExists.password
  );
  if (!validPassword)
    return res.status(400).send({ auth: false, message: "Incorrect Password" });

  const token = jwt.sign({ _id: userExists._id }, process.env.TOKEN_SECRET);

  res.cookie("user_id__token", token, {
    maxAge: 2592000000,
    httpOnly: true,
  });

  res.send({
    auth: true,
    message: `Welcome ${userExists.username}`,
    username: userExists.username,
  });
});

// LOGOUT USER
router.post("/logout", authenticate, async (req, res) => {
  if (req.cookies.user_id__token === undefined)
    return res.status(200).send({ message: "Already logged out" });
  if (req.userIdParams === undefined || req.userIdParams === null)
    return res.status(400).send({ message: "Invalid call made" });
  await User.findOneAndUpdate(
    { _id: req.userIdParams },
    {
      $set: {
        isActive: false,
      },
    }
  );
  res.cookie("user_id__token", "", { maxAge: 0 });
  res.status(200).send({ message: "Logged out" });
});

module.exports = router;
