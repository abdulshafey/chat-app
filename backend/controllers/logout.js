const { ApiResponse } = require("../utils/ApiResponse");

const logout = (req, res) => {
  try {
    // Clear the token from cookies
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "User logged out successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};

module.exports = logout;
