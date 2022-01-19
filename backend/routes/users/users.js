const express = require('express');
const router = express.Router();
var User = require("../../models/user");
// const generateJWT = require('../../utils/generateJWT');
// const bcrypt = require("bcryptjs");
const getToken = require('../../utils/getToken')
const passport = require('passport');
// const jwt = require('../../config/JWTconfig')

const { body, validationResult } = require("express-validator");
const friendsRouter = require('./friends');

router.use('/friends', friendsRouter);

// user must have a valid token to access routes below this point
router.use(
  passport.authenticate(["jwt", "facebook-token"], { session: false })
);
router.use(getToken);

/* GET all users */
router.get('/', function (req, res, next) {
    console.log(req.payload)
    // list of all users
    User.find()
    .populate({ path: 'friends', select: 'firstName lastName' })
    .populate({ path: 'friendRequests', select: 'firstName lastName' })
    .exec(function (err, allUsers) {
      if (err) {
        return next(err);
      }
      // successful, so send data
      res.status(200).json({ allUsers })
    });
});

/* POST logout */
router.post('/logout', function (req, res, next) {
  res.json({ message: "POST logout of user account - not implemented" })
});

/* GET one user */
router.get('/:id', function (req, res, next) {
  res.json({ message: "GET a specific user - not implemented" })
});

/* PUT update profile details (can only update details of logged in user profile)*/
router.put('/:id', function (req, res, next) {
  res.json({ message: "PUT edit user details - not implemented" })
});

/* PUT update profile picture (come back to this after other controllers are done)*/
router.put('/:id/image', function (req, res, next) {
  res.json({ message: "POST edit profile pic - not implemented" })
});

/* DELETE user (can only delete own acount)*/
router.delete('/:id', function (req, res, next) {
  res.json({ message: "DELETE user account - not implemented" })
});

module.exports = router;
