const UserModel = require("../models/userModel");
const { ApiError } = require("../utils/apiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { sendErrorResponse } = require("../utils/responseHelper");

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (email.trim() === "") {
      throw new ApiError(400, "Write proper Email");
    }
    const findEmail = await UserModel.findOne({ email }).select("-password");
    if (!findEmail) {
      throw new ApiError(400, "User not exist");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, findEmail, "Email verified"));
  } catch (error) {
    console.log("Error in checkEmail:", error);
    return sendErrorResponse(res, error);
  }
};

module.exports = checkEmail;
