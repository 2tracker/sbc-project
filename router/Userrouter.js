const express = require("express");
const User = require("../controller/UserController");
const { Userguard } = require("../utils/middleware");
const Router = express.Router();

Router.post(
  "/register",
  User.RegisterUser
);
Router.post("/sendotp", User.SendOtp);

Router.post("/login", User.Login);
module.exports = Router;
