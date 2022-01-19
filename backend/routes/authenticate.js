const express = require('express');
const router = express.Router();
var User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateJWT = require('../utils/generateJWT');
const { body, validationResult } = require("express-validator");
const facebookTokenStrategy = require("../config/facebookConfig");

const passport = require("passport");
passport.use(facebookTokenStrategy);

router.post( "/facebook/token",
  passport.authenticate("facebook-token"),
  (req, res) => {
    res.status(201).json({
      message: "Facebook auth success!",
      user: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        id: req.user._id,
        picture: req.user.picture ? req.user.picture : "",
        facebookId: req.user.facebookId,
      },
    });
  }
);

/* POST signup - no need to encrypt the password here, thats done directly in the user model */
router.post('/signup',
  //validate user input
  body("email")
    .trim()
    .isEmail()
    .escape()
    .withMessage("Must enter valid email."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must be at least 6 characters long."),
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Must enter first name."),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Must enter last name."),

  async (req, res, next) => {
    // extract the validation errors from request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // if error(s), show error
      console.log(errors);
      return res.status(400).json({
        message: "Oops! Something went wrong.",
        errors: errors.array()
      });
    } else {
      // check if email is already in use
      const exists = await User.findOne({ email: req.body.email })
      if (exists) return res.status(409).json({ message: "A user has already registered with that email." })

      // data is valid, store data as new user in db
      const { email, password, firstName, lastName } = req.body;
      const user = new User({ email, password, firstName, lastName })
      await user.save()
      const token = await generateJWT(user);
      return res.status(201).json({ message: "Sign up successful", user: user, token: token });
    }
  }
);

/* POST login */
router.post('/login',
  //validate user input
  body("email")
    .trim()
    .isEmail()
    .escape()
    .withMessage("Must enter valid email."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must be at least 6 characters long."),


  async (req, res, next) => {
    // extract the validation errors from request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // if error(s), show error
      console.log(errors);
      return res.status(400).json({
        message: "Oops! Something went wrong.",
        errors: errors.array()
      });
    } else {
      // validation passed, proceed to check credentials
      let { email, password } = req.body;
      //check if email is in DB
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log('--there was an error--');
          return res.status(401).json({ message: "there was an error" })
        }
        if (!user) {
          console.log('--incorrect email--');
          return res.status(401).json({ message: "incorrect email" })
        }

        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            // handle error
            console.log('--there was an error!--');
            return res.status(500).json({ message: "there was an error!" })
          }
          if (response) {
            //passwords match, create token and send to client
            console.log('--passwords match!--');
            const token = generateJWT(user);

            return res.status(200).json({
              message: "Login success!",
              token,
              user,
            })
          } else {
            // passwords do not match!
            console.log('--passwords do not match!--');
            return res.status(401).json({ message: "passwords do not match!" })
          }
        });
      });
    }
  }
);

/* POST login to test account */
router.post('/testuser', function (req, res, next) {
  // find user that matches .env test user credentials
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;
  console.log(email, password);
  //check if email is in DB
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log('--there was an error--');
      return res.status(401).json({ message: "there was an error" })
    }
    if (!user) {
      console.log('--incorrect email--');
      return res.status(401).json({ message: "incorrect email" })
    }

    bcrypt.compare(password, user.password, (err, response) => {
      if (err) {
        // handle error
        console.log('--there was an error!--');
        return res.status(500).json({ message: "there was an error!" })
      }
      if (response) {
        //passwords match, create token and send to client
        console.log('--passwords match!--');
        const token = generateJWT(user);

        return res.status(200).json({
          message: "Login success!",
          token,
          user,
        })
      } else {
        // passwords do not match!
        console.log('--passwords do not match!--');
        return res.status(401).json({ message: "passwords do not match!" })
      }
    });
  });
});

module.exports = router;
