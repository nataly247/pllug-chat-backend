const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const UserModel = require("./user.model");
const authConfig = require("../../config/auth");

const hashPassword = password =>
  bcrypt.hashSync(password, authConfig.bcryptRounds);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(user, done) {
  done(null, { username: user.username, _id: user._id });
});

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, done) =>
      UserModel.create({
        username,
        password: hashPassword(password)
      })
        .then(user =>
          done(null, user.toObject(), {
            message: "New user successfully created"
          })
        )
        .catch(e => done(e))
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.findByUsername(username);
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done({ message: "Wrong Password" });
        }
        return done(null, user.toObject(), {
          message: "Logged in Successfully"
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      //secret we used to sign our JWT
      secretOrKey: authConfig.authSecret,
      //we expect the user to send the token as a query paramater with the name 'secret_token'
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    (jwtPayload, done) =>
      UserModel.findById(jwtPayload.user._id)
        .lean()
        .then(user => done(null, user))
        .catch(err => done(err))
  )
);

module.exports = passport;
