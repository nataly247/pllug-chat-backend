const bcrypt = require("bcrypt");

const mongoose = require("../mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  model: UserModel,
  create: data => {
    const user = new UserModel(data);
    return user.save();
  },
  findById: (id, projection) => UserModel.findById(id, projection),
  findByUsername: username => UserModel.findOne({ username })
};
