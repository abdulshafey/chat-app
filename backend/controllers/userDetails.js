const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/apiError");
const getUserDetailsFromToken = require("../utils/getUserDetailsFromToken");

const userDetails = async (req, res) => {
  const token = req?.cookies?.token || req.body;
  const user = await getUserDetailsFromToken(token);
  if (!user) {
    throw new ApiError(400, "User not found !");
  }
  return res.status(200).json(new ApiResponse(200, user, "User details"));
};

module.exports = userDetails;
