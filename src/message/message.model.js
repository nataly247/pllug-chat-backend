const mongoose = require("../mongoose");
const { Schema } = mongoose;

const messageSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String },
    type: { type: String, default: "system" }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

const messageModel = mongoose.model("message", messageSchema);

module.exports = {
  messageModel,
  createMessage: data => {
    const message = new messageModel(data);
    return message.save();
  },
  findAll: ({ skip, limit }) =>
    messageModel
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
};
