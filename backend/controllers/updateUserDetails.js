const UserModel = require("../models/userModel");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/apiError");
const getUserDetailsFromToken = require("../utils/getUserDetailsFromToken");
const { sendErrorResponse } = require("../utils/responseHelper");

const updateUserDetails = async (req, res) => {
  try {
    const token = req.cookies.token;

    // Validate token and get user details
    const user = await getUserDetailsFromToken(token);
    if (!user || !user._id) {
      throw new ApiError(401, "Unauthorized: Invalid or missing token");
    }

    // Extract fields to update from the request body
    const { name, profile_pic } = req.body;

    // Update the user in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { name, profile_pic },
      { new: true, runValidators: true } // Return updated doc and validate fields
    );

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    // Respond with the updated user data
    res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully"));
  } catch (error) {
    console.error("Error updating user details:", error);
    return sendErrorResponse(res, error);
  }
};

module.exports = updateUserDetails;
