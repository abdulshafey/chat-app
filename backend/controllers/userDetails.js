const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/apiError");
const getUserDetailsFromToken = require("../utils/getUserDetailsFromToken");
const { sendErrorResponse } = require("../utils/responseHelper");

const userDetails = async (req, res) => {
  try {
    const token = req?.cookies?.token || "";
    const user = await getUserDetailsFromToken(token);
    if (!user) {
      throw new ApiError(404, "User not found !");
    }
    return res.status(200).json(new ApiResponse(200, user, "User details"));
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

module.exports = userDetails;
