const passport = require("./passport");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

const UserModel = require("./user.model");

module.exports = {
  signUp: (req, res, next) =>
    passport.authenticate("signup", (err, { password, ...user }) => {
      if (err) {
        if (err.message.indexOf("E11000") !== -1) {
          return next({ status: 400, message: "Username is already taken" });
        }
        return next(err);
      }
      req.login(user, { session: false }, error => {
        if (error) {
          return next(err);
        }
        const token = jwt.sign(
          { user: { _id: user._id, username: user.username } },
          authConfig.authSecret
        );

        res.status(201).json({
          message: "Sign up success",
          data: {
            user,
            token
          }
        });
      });
    })(req, res, next),

  login: (req, res, next) =>
    passport.authenticate("login", (err, data, info) => {
      if (err) {
        return next(err);
      }
      const { password, ...user } = data;
      if (!password) {
        return next({
          status: 403,
          message: info.message ? info.message : "User not found"
        });
      }

      req.login(user, { session: false }, err => {
        if (err) {
          return next(err);
        }

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, authConfig.authSecret);

        res.status(200).json({
          data: { user, token },
          message: "Login successful"
        });
      });
    })(req, res, next),

  update: (req, res, next) => {
    const { avatar } = req.body;
    return UserModel.model
      .findOneAndUpdate({ _id: req.user._id }, { $set: { avatar } })
      .then(() => res.status(200).json({ message: "Update success" }))
      .catch(next);
  },

  getUser: (req, res, next) => {
    return module.exports
      .findById(req.user._id)
      .then(user =>
        res.status(200).json({ message: "User obtained", data: { user } })
      )
      .catch(next);
  },

  findById: userId => {
    return UserModel.findById(userId, {
      password: 0
    }).lean();
  }
};
