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
router.get('/', async (req, res, next) => {
  // console.log(req.payload)
  try {
    const allUsers = await User.find()
      .populate({ path: 'friends', select: 'firstName lastName' })
    // .populate({ path: 'friendRequests', select: 'firstName lastName' });

    return res.status(200).json({ message: "A list of all of the users.", allUsers })

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }

});

/* GET one user and user's posts */
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ user: req.params.id })
      .sort("-timestamp");

    if (user === null) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ user, posts });

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }

});

/* GET one user's friends */
router.get('/:id/friendList', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user === null) {
      return res.status(404).json({ message: "user not found" });
    }

    const friends = await Promise.all(
      user.friends.map((id) => {
        return User.findById(id);
      })
    )

    let friendList = [];
    friends.map((friend) => {
      const { _id, firstName, lastName, picture } = friend;
      friendList.push({ _id, firstName, lastName, picture });
    });

    return res.status(200).json({ friendList });

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }

});

/* GET one user's friend requests */
router.get('/:id/friendRequests', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user === null) {
      return res.status(404).json({ message: "user not found" });
    }

    const friendRequests = await Promise.all(
      user.friendRequests.map((id) => {
        return User.findById(id);
      })
    )

    let friendRequestList = [];
    friendRequests.map((friend) => {
      const { _id, firstName, lastName, picture } = friend;
      friendRequestList.push({ _id, firstName, lastName, picture });
    });

    return res.status(200).json({ friendRequestList });

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }

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
