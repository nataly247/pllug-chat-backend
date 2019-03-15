const messageRouter = require("express").Router();
const messageController = require("./message.controller");

messageRouter.get("/", (req, res, next) =>
  messageController
    .getMessageHistory(req.query)
    .then(history =>
      res.status(200).json({ data: { history }, message: "History obtained" })
    )
    .catch(next)
);

module.exports = messageRouter;
