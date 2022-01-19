var express = require('express');
var router = express.Router();
const passport = require('passport');
const user = require('../../models/user');
const getToken = require('../../utils/getToken')

// user must have a valid token to access routes below this point
router.use(
  passport.authenticate(["jwt", "facebook-token"], { session: false })
);
router.use(getToken);

/* POST friend request */
router.post('/req/:targetUserId', async (req, res, next) => {
  const currentUserId = req.payload.id;
  const targetUserId = req.params.targetUserId;

  try {
    const currentUser = await user.findById(currentUserId);
    const targetUser = await user.findById(targetUserId);
    // console.log(currentUserId, targetUserId);
    // console.log(targetUser.friendRequests);

    // check currentUser isnt same as targetUser
    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: "You can not friend request yourself." })
    }

    // check if currentUser and targetUser are already friends
    if (currentUser.friends.includes(targetUserId)) {
      return res.status(400).json({ message: "You can are already friends with this user." })
    }

    // check if currentUser has already sent a friend request
    if (targetUser.friendRequests.includes(currentUserId)) {
      return res.status(400).json({ message: "You have already sent a friend request." })
    }

    // push currentUser to targetUser friendRequests
    const updatedTargetUserFriendRequests = [...targetUser.friendRequests, currentUserId];
    targetUser.friendRequests = updatedTargetUserFriendRequests;
    const updatedTargetUser = await targetUser.save();
    return res.status(201).json({ message: "Friend request sent success!", potentialFriend: updatedTargetUser })

  } catch (err) {
    return res.status(500).json({ error: err.message, message: "Could not find user." });
  }

});

/* DELETE cancel friend request */
router.delete('/req', function (req, res, next) {
  res.json({ message: "DELETE req - remove friend request" })
});

/* POST accept friend request */
router.post('/accept', function (req, res, next) {
  res.json({ message: "POST accept friend request" })
});

/* POST decline friend request */
router.post('/decline', function (req, res, next) {
  res.json({ message: "POST decline friend request" })
});

/* DELETE remove friend  */
router.delete('/remove', function (req, res, next) {
  res.json({ message: "DELETE friend/un-friend" })
});

module.exports = router;
