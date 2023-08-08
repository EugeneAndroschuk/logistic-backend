const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { User } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_URL } =
  process.env;

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${BACKEND_URL}/api/users/google/callback`,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({
            email: profile.email,
          });

          if (existingUser) {
            const payload = {
              id: existingUser._id,
            };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
            const updatedUser = await User.findByIdAndUpdate(existingUser._id, {
              token,
            });

            return done(null, updatedUser);
            }
            
             const payload = {
               id: profile.email,
             };
             const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

          const newUser = await User.create({
            email: profile.email,
            name: profile.displayName,
            token,
          });

          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
