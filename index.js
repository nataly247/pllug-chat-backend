const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const UserRouter = require("./src/user");

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/user", UserRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

app.listen(3000);
