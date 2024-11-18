const UserModel = require("../models/userModel");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/apiError");

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
    return res.status(500).json({
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = registerUser;
