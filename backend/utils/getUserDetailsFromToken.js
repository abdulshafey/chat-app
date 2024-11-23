const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "Session out",
      logout: true,
    };
  }
  const decode = jwt.verify(token, process.env.Access_Token_SecretKey);
  const user = await UserModel.findById(decode._id).select("-password");

  return user;
};

module.exports = getUserDetailsFromToken;
