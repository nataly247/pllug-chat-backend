const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const UserRouter = require("./src/user");
const MessageRouter = require("./src/message");
const io = require("./src/socket");

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/user", UserRouter);
app.use("/message", MessageRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

app.listen(process.env.PORT || 3000);
