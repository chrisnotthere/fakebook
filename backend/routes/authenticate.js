const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const generateJWT = require('../utils/generateJWT');
const facebookTokenStrategy = require("../config/facebookConfig");
const jwt = require('../config/JWTconfig')
const User = require("../models/user");

const passport = require("passport");
passport.use(facebookTokenStrategy);
passport.use(jwt);

router.post("/facebook/token",
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

/* POST signup  */
router.post('/signup',
  //validate user input with express-validator
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
      try {
        // check if email is already in use
        const exists = await User.findOne({ email: req.body.email })
        if (exists) {
          return res.status(409).json({ message: "A user has already registered with that email." })
        } 

        // data is valid, store data as new user in db
        var { email, password, firstName, lastName } = req.body;
        const hash = await bcrypt.hash(password, 10);
        password = await hash;
        const user = await new User({ email, password, firstName, lastName })
        await user.save()
        const token = await generateJWT(user);
        return res.status(201).json({ message: "Sign up successful", user: user, token: token });

      } catch (error) {
        return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
      }
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
      try {
        // proceed to check credentials
        let { email, password } = req.body;
        // check if email is in DB
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
            // console.log('password---', password)
            // console.log('user.password---', user.password)
            if (err) {
              console.log('--there was an error!--');
              return res.status(500).json({ message: "there was an error!" })
            }
            if (response) {
              //passwords match, create token and send to client
              console.log('--passwords match!--');
              const token = generateJWT(user);
              return res.status(200).json({ message: "Login success!", token, user })

            } else {
              // passwords do not match!
              console.log('--passwords do not match!--');
              return res.status(401).json({ message: "passwords do not match!" })
            }
          });
        });
      } catch (error) {
        return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
      }
    }
  }
);

/* POST login to test account */
router.post('/testuser', function (req, res, next) {
  // find user that matches .env test user credentials
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;
  // check if email is in DB
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
        console.log('--there was an error!--');
        return res.status(500).json({ message: "there was an error!" })
      }
      if (response) {
        // passwords match, create token and send to client
        console.log('--passwords match!--');
        const token = generateJWT(user);

        return res.status(200).json({ message: "Login success!", token, user })

      } else {
        // passwords do not match!
        console.log('--passwords do not match!--');
        return res.status(401).json({ message: "passwords do not match!" })
      }
    });
  });
});

/* POST logout */
router.post('/logout', function (req, res, next) {
  res.json({ message: "POST logout of user account - not implemented" })
});

module.exports = router;
