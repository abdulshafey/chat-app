const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profile_pic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
UserModel.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

UserModel.methods.isPasswordCorrect = async function (password) {
  let user = this;
  return await bcrypt.compare(password, user.password);
};

UserModel.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.Access_Token_SecretKey,
    {
      expiresIn: process.env.Access_Token_Expiry,
    }
  );
};
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
