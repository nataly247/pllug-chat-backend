const messageModel = require("../message/message.model");
module.exports = {
  createMessage: data =>
    messageModel.createMessage(data).then(doc =>
      doc
        .populate({
          path: "user",
          select: { username: 1, avatar: 1, createdAt: 1 }
        })
        .execPopulate()
    ),
  getMessageHistory: ({ skip = 0, limit = 100 }) =>
    messageModel.findAll({ skip: +skip, limit: +limit }).populate({
      path: "user",
      select: { username: 1, avatar: 1, createdAt: 1 }
    })
};
