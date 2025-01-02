const UserModel = require("../models/userModel");
const { ApiError } = require("../utils/apiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { sendErrorResponse } = require("../utils/responseHelper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const checkPassword = async (req, res) => {
  try {
    const { password, userId, email } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ApiError(404, "User does no exist");
    }
    const isPAsswordValid = await bcrypt.compare(password, user.password)
    if (!isPAsswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    const tokenData = {
      id : user._id,
      email : user.email 
  }
    const token = await jwt.sign(tokenData, process.env.Access_Token_SecretKey,{expiresIn: "1d"})
    
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json(new ApiResponse(200, "", "Login successfully ", token));
  } catch (error) {
    console.log("Error in checkPassword ", error);
    return sendErrorResponse(res, error);
  }
};

module.exports = checkPassword;
