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
  //console.log("Decode ",decode);
  const user = await UserModel.findOne({_id : decode.id}).select("-password")
 // console.log("User ", user);

  return user;
};

module.exports = getUserDetailsFromToken;
