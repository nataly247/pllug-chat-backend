const express = require("express");
const userRouter = express.Router();
const userController = require("./user.controller");
const auth = require("./auth");

userRouter.post("/sign-up", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.put("/me", auth, userController.update);
userRouter.get("/me", auth, userController.getUser);

module.exports = userRouter;
