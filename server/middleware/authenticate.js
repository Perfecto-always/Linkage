const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authenticate = async (req, res, next) => {
  let token = req.cookies.user_id__token;
  if (!token)
    return res.status(401).json({ auth: false, message: "Token Required!" });

  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      res.status(400).json({ auth: false, message: "Invalid Token" });
    } else {
      req.userIdParams = decoded._id;
      next();
    }
  });
};

module.exports = authenticate;
// exports = { userIdParams };
