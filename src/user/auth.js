const passport = require("passport");

module.exports = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next({ status: 403, message: "Wrong authorization token passed" });
    }

    return req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return next();
    });
  })(req, res, next);
