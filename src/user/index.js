const express = require("express");
const userRouter = express.Router();
const userController = require("./user.controller");

userRouter.post("/sign-up", userController.signUp);
userRouter.post("/login", userController.login);

module.exports = userRouter;
