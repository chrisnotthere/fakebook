const express = require('express');
const router = express.Router();
const friendsRouter = require('./friends');
var User = require("../../models/user");
var Post = require("../../models/post");
const { body, validationResult } = require("express-validator");
const passport = require('passport');
const getToken = require('../../utils/getToken')

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

/* GET one user and user's posts */
router.get('/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const posts = await Post.find({ user: req.params.id })
    .sort("-timestamp");
  if (user === null) {
    return res.status(404).json({ msg: "user not found" });
  }
  // console.log(user);
  // console.log(posts);
  res.status(200).json({ user, posts });
});

/* PUT update profile details (can only update details of logged in user profile)*/
// LOW PRIORITY
router.put('/:id', function (req, res, next) {
  res.json({ message: "PUT edit user details - not implemented" })
});

/* PUT update profile picture */
// LOW PRIORITY
router.put('/:id/image', function (req, res, next) {
  res.json({ message: "POST edit profile pic - not implemented" })
});

/* DELETE user (can only delete own acount)*/
// LOW PRIORITY
router.delete('/:id', function (req, res, next) {
  res.json({ message: "DELETE user account - not implemented" })
});

module.exports = router;
