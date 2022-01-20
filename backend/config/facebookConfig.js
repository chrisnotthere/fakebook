const FacebookTokenStrategy = require("passport-facebook-token");
const passport = require("passport");
const User = require("../models/user");

/////////////////////////UNFINISHED/////////////////////////
//setting up FacebookTokenStrategy
module.exports = new FacebookTokenStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    fbGraphVersion: "v3.0",
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate(
      { facebookId: profile.id },
      {
        firstName: profile._json.first_name,
        lastName: profile._json.last_name,
        email: profile._json.email,
        picture: profile.photos[0].value,
      },
      function (error, user) {
        return done(error, user);
      }
    );
  }
);

// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser(function (user, done) {
  console.log(`--serialize user--`);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    console.log(`--deserialize user--`);
    done(err, user);
  });
});