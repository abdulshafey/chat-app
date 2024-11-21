const express = require("express");
const registerUser = require("../controllers/registerUser");
const checkEmail = require("../controllers/checkEmail");
const checkPassword = require("../controllers/checkPassword");
const router = express.Router();

router.post("/register", registerUser);
router.post("/email", checkEmail);
router.post("/login", checkPassword);

module.exports = router;
