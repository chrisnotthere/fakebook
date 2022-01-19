const express = require('express');
const router = express.Router();
var User = require("../../models/user");
const generateJWT = require('../../utils/generateJWT');

const { body, validationResult } = require("express-validator");
const friendsRouter = require('./friends');

router.use('/friends', friendsRouter);
// router.use(passport.authenticate())

/* GET all users */
router.get('/', function (req, res, next) {
  res.json({ message: "GET all users - not implemented" })
});

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
      const user = new User({ email, password, firstName, lastName})
      await user.save()
      const token = await generateJWT(user);
      return res.status(201).json({ message: "Sign up successful", user: user, token: token });
    }
  }
);


/* POST login */
router.post('/login', function (req, res, next) {
  res.json({ message: "POST login - not implemented" })
});

/* POST login test account */
router.post('/testuser', function (req, res, next) {
  res.json({ message: "POST login to test account - not implemented" })
});

/* POST logout */
router.post('/logout', function (req, res, next) {
  res.json({ message: "POST logout of user account - not implemented" })
});

/* GET one user */
router.get('/:id', function (req, res, next) {
  res.json({ message: "GET a specific user - not implemented" })
});

/* PUT update profile details */
router.put('/:id', function (req, res, next) {
  res.json({ message: "PUT edit user details - not implemented" })
});

/* PUT update profile picture */
router.put('/:id/image', function (req, res, next) {
  res.json({ message: "POST edit profile pic - not implemented" })
});

/* DELETE user */
router.delete('/:id', function (req, res, next) {
  res.json({ message: "DELETE user account - not implemented" })
});



module.exports = router;
