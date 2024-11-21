const express = require("express");
const registerUser = require("../controllers/registerUser");
const checkEmail = require("../controllers/checkEmail");
const checkPassword = require("../controllers/checkPassword");
const userDetails = require("../controllers/userDetails");
const router = express.Router();

router.post("/register", registerUser);
router.post("/email", checkEmail);
router.post("/login", checkPassword);
router.get("/user-details", userDetails);
module.exports = router;
