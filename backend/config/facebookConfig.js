const FacebookTokenStrategy = require("passport-facebook-token");
const passport = require("passport");
const User = require("../models/user");

const bcrypt = require("bcryptjs");

//setting up FacebookTokenStrategy
function initialize(passport) {

  passport.use(
    new FacebookTokenStrategy((username, password, done) => {

    })
  );
  
  // save user.id in cookie/session
  passport.serializeUser(function (user, done) {
    console.log(`serialize user`);
    done(null, user.id);
  });
  
  // user.id is used to find the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      console.log(`deserialize user`);
      done(err, user);
    });
  });
}

module.exports = initialize;