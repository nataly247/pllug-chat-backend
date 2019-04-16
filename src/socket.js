const userController = require("./user/user.controller");
const messsageController = require("./message/message.controller");

const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = server => {
  const io = require("socket.io")(server);
  io.use((socket, next) => {
    const { token } = socket.handshake.query;
    try {
      jwt.verify(token, authConfig.authSecret);
    } catch (e) {
      return next("Authentication error");
    }
    const { user } = jwt.decode(token);

    return userController.findById(user._id).then(user => {
      if (!user) {
        return next("User not found");
      }
      socket.user = user;
      return next();
    });
  });

  const emitMessage = message => io.emit("message", message);

  io.on("connection", socket => {
    messsageController
      .createMessage({
        user: socket.user._id,
        text: `User ${socket.user.username} connected`
      })
      .then(emitMessage);

    socket.on("message", text =>
      messsageController
        .createMessage({
          user: socket.user._id,
          text,
          type: "user"
        })
        .then(emitMessage)
    );

    socket.on("disconnect", () => {
      messsageController
        .createMessage({
          user: socket.user._id,
          text: `User ${socket.user.username} disconnected`
        })
        .then(emitMessage);

      socket.removeAllListeners("message");
    });
  });
};
