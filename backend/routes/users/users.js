const express = require('express');
const router = express.Router();
const passport = require('passport');
const getToken = require('../../utils/getToken')
const friendsRouter = require('./friends');
const User = require("../../models/user");
const Post = require("../../models/post");

router.use('/friends', friendsRouter);

// user must have a valid token to access routes
router.use(passport.authenticate(["jwt", "facebook-token"], { session: false }));
router.use(getToken);

/* GET all users */
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.find().populate({ path: 'friends', select: 'firstName lastName' })
    return res.status(200).json({ message: "A list of all of the users.", allUsers })

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

/* GET one user and user's posts */
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ user: req.params.id }).sort("-timestamp");

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

/* GET one user's non-friends, all users that are not already friends with currentUser */
router.get('/:id/nonFriends', async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    if (currentUser === null) {
      return res.status(404).json({ message: "user not found" });
    }

    const allUsers = await User.find({});

    const nonFriends = allUsers.filter((user) =>
      !currentUser.friends.includes(user._id) &&
      user._id.toString() !== currentUser._id.toString()
    );

    return res.status(200).json({ nonFriends });

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

/* PUT update profile details */
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(404).json({ message: "user not found" });
    }
    
    const { firstName, lastName, picture, coverPicture, about } = req.body;
    user.firstName = firstName;
    user.lastName = lastName;
    user.picture = picture;
    user.coverPicture = coverPicture;
    user.about = about;

    const updatedUser = await user.save();
    return res.status(200).json({ message: "User details updated.", updatedUser });

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

/* DELETE user (can only delete own account) */
router.delete('/:id', function (req, res, next) {
  res.json({ message: "DELETE user account - not implemented" })
});

module.exports = router;
