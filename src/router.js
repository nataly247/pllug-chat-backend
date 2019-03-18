const router = require("express").Router();

const UserRouter = require("./user");
const MessageRouter = require("./message");

router.get("/", (req, res, next) =>
  res.status(200).json({
    message: "Chat API is alive and kicking"
  })
);
router.use("/user", UserRouter);
router.use("/message", MessageRouter);

router.use("*", (req, res, next) =>
  res.status(404).json({ message: "Page not found" })
);

module.exports = router;
