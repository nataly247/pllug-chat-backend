const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mainRouter = require("./src/router");
const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());

app.use("/", mainRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

const server = app.listen(process.env.PORT || 3000);
const io = require("./src/socket")(server);
