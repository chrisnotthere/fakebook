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
      return res.status(400).json({ message: "You are already friends with this user." })
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

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
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
    const updatedTargetUserFriendRequests = targetUser.friendRequests.filter((user) => user != currentUserId);
    targetUser.friendRequests = updatedTargetUserFriendRequests;
    const updatedTargetUser = await targetUser.save();
    return res.status(201).json({ message: "Friend request removed successfully.", potentialFriend: updatedTargetUser })

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

/* POST accept friend request */
router.post('/accept/:newFriendId', async (req, res, next) => {
  const currentUserId = req.payload.id;
  const newFriendId = req.params.newFriendId;
  try {
    const currentUser = await user.findById(currentUserId);
    const newFriend = await user.findById(newFriendId);

    // check if friend request exists
    if (!currentUser.friendRequests.includes(newFriendId)) {
      return res.status(400).json({ message: "Friend request not found." })
    }

    // check if currentUser and newFriend are already friends
    if (currentUser.friends.includes(newFriendId)) {
      return res.status(400).json({ message: "You are already friends with this user." })
    }

    // remove friend request //**NOTE** this is not working
    const updatedFriendRequests = newFriend.friendRequests.filter((friendRequest) => friendRequest != currentUserId);
    newFriend.friendRequests = updatedFriendRequests;
    const updatednewFriend = await newFriend.save();
    // await newFriend.save();

    // add newFriend to currentUser friend list
    const updatedCurrentUserFriends = [...currentUser.friends, newFriendId];
    currentUser.friends = updatedCurrentUserFriends;
    const updatedCurrentUser = await currentUser.save()

    // add currentUser to newFriend friend list
    const updatedNewFriendFriends = [...newFriend.friends, currentUserId];
    newFriend.friends = updatedNewFriendFriends;
    const updatedNewFriend = await newFriend.save()

    // return currentUser's updated friends list as confirmation
    const updatedCurrentUserAndFriends = await user.findById(currentUserId).populate('friends');
    return res.status(201).json({ message: "New friend added..", currentUser: updatedCurrentUserAndFriends })

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

/* POST decline friend request */
router.post('/decline/:rejectedFriendId', async (req, res, next) => {
  const currentUserId = req.payload.id;
  const rejectedFriendId = req.params.rejectedFriendId;
  try {
    const currentUser = await user.findById(currentUserId);

    // check if request exists
    if (!currentUser.friendRequests.includes(rejectedFriendId)) {
      return res.status(400).json({ message: "Friend request not found." })
    }

    // remove friend request
    const updatedFriendRequests = currentUser.friendRequests.filter((user) => user != rejectedFriendId);
    currentUser.friendRequests = updatedFriendRequests;

    // return currentUser's friend requests to confirm request removal
    const updatedCurrentUser = await currentUser.save();
    return res.status(201).json({ message: "Friend request declined.", currentUser: updatedCurrentUser })

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

/* DELETE remove friend  */
router.delete('/remove/:removedFriendId', async (req, res, next) => {
  // res.json({ message: "DELETE friend/un-friend" })
  const currentUserId = req.payload.id;
  const removedFriendId = req.params.removedFriendId;
  try {
    const currentUser = await user.findById(currentUserId);
    const removedFriend = await user.findById(removedFriendId);
    // console.log(currentUser, removedFriend)
    // console.log(currentUser.friends, removedFriend.friends);

    // check if currentUser and removedFriend are actually friends
    if (!currentUser.friends.includes(removedFriendId)) {
      return res.status(400).json({ message: "You must be friend to remove a friend." })
    }

    // remove currentUser from removedFriends friend list
    const updatedRemovedFriendFriends = removedFriend.friends.filter((user) => user.id != `new ObjectId("${currentUserId}")`);
    removedFriend.friends = updatedRemovedFriendFriends;
    console.log(req.payload.id);
    console.log(updatedRemovedFriendFriends);
    await removedFriend.save()

    // remove removedFriend from currentUsers friend list
    const updatedCurrentUserFriends = currentUser.friends.filter((user) => user.id != `new ObjectId("${removedFriendId}")`);
    currentUser.friends = updatedCurrentUserFriends;
    await currentUser.save()

    // return currentUser as confirmation of removal
    const updatedCurrentUser = await user.findById(currentUserId);
    return res.status(201).json({ message: "Friend removed.", currentUser: updatedCurrentUser })

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

module.exports = router;
