const UserModel = require("../models/userModel");
const { ApiResponse } = require("../utils/ApiResponse");
const { sendErrorResponse } = require("../utils/responseHelper");

const searchUser = async (req, res) => {
  try {
    const { search } = req.body;
    const query = new RegExp(search, "i", "g");

    const user = await UserModel.find({
      $or: [{ name: query }, { email: query }],
    }).select("-password");

    return res.status(200).json(new ApiResponse(200, user));
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

module.exports = searchUser;
