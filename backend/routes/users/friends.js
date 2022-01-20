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

    // currentUser is same as targetUser
    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: "You cannot friend request yourself." })
    }

    // currentUser and targetUser are already friends
    if (currentUser.friends.includes(targetUserId)) {
      return res.status(400).json({ message: "You can are already friends with this user." })
    }

    // currentUser has already sent a friend request
    if (targetUser.friendRequests.includes(currentUserId)) {
      return res.status(400).json({ message: "You have already sent a friend request." })
    }

    // add currentUser to targetUser friendRequests
    const updatedTargetUserFriendRequests = [...targetUser.friendRequests, currentUserId];
    targetUser.friendRequests = updatedTargetUserFriendRequests;
    const updatedTargetUser = await targetUser.save();
    return res.status(201).json({ message: "Friend request sent success!", potentialFriend: updatedTargetUser })

  } catch (err) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: err.message });
  }

});

/* DELETE cancel friend request */
router.delete('/req/:targetUserId', async (req, res, next) => {
  const currentUserId = req.payload.id;
  const targetUserId = req.params.targetUserId;
  try {
    //const currentUser = await user.findById(currentUserId);
    const targetUser = await user.findById(targetUserId);

    // check currentUser isnt same as targetUser
    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: "You cannot friend request yourself." })
    }

    // remove friendRequest 
    const updatedTargetUserFriendRequests = targetUser.friendRequests.filter((user) => user != req.payload.id);
    targetUser.friendRequests = updatedTargetUserFriendRequests;
    const updatedTargetUser = await targetUser.save();
    return res.status(201).json({ message: "Friend request removed successfully.", potentialFriend: updatedTargetUser })

  } catch {
    return res.status(500).json({ message: "Oops, something went wrong.", error: err.message });
  }
});

/* POST accept friend request */
router.post('/accept', async (req, res, next) => {
  const currentUserId = req.payload.id;
  const newFriendUserId = req.params.targetUserId;
  try {
    const currentUser = await user.findById(currentUserId);
    const newFriendUser = await user.findById(newFriendUserId);

    // check if friend request exists
    if (!currentUser.friendRequests.includes(newFriendUser)) {
      return res.status(400).json({ message: "Friend request not found." })
    }

    // remove friend request

    // add currentUser to newFriendUser friend list

    // add newFriendUser to currentUser friend list

    // return currentUser's updated friends list as confirmation

  } catch {
    return res.status(500).json({ message: "Oops, something went wrong.", error: err.message });
  }
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
