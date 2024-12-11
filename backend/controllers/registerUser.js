const UserModel = require("../models/userModel");
const { ApiError } = require("../utils/apiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { sendErrorResponse } = require("../utils/responseHelper");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profil_pic } = req.body;
    if ([name, email, password].some((field) => field.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
    const checkUser = await UserModel.findOne({ email });

    if (checkUser) {
      throw new ApiError(409, "User is already exists");
    }
    const payload = {
      name,
      email,
      password,
      profil_pic: profil_pic || "",
    };

    const user = await UserModel.create(payload);
    const createdUser = await UserModel.findById(user._id).select("-password");
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering a user");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    console.log("Error in registerUser:", error); // Log the error for debugging
    return sendErrorResponse(res, error);
  }
};

module.exports = registerUser;
