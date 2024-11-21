const UserModel = require("../models/userModel");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/apiError");
const { sendErrorResponse } = require("../utils/responseHelper");

const checkPassword = async (req, res) => {
  try {
    const { password, userId, email } = req.body;

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new ApiError(404, "User does no exist");
    }
    const isPAsswordValid = user.isPasswordCorrect(user.password);
    if (!isPAsswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    const token = user.generateAccessToken();

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
