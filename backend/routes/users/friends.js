const express = require('express');
const router = express.Router();
const passport = require('passport');
const getToken = require('../../utils/getToken')
const User = require('../../models/user');

// user must have a valid token to access routes
router.use(passport.authenticate(['jwt', 'facebook-token'], { session: false }));
router.use(getToken);

/* POST friend request */
router.post('/req/:targetUserId', async (req, res, next) => {
  const currentUserId = req.payload.id;
  const targetUserId = req.params.targetUserId;
  try {
    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: 'You cannot friend request yourself.' })
    }

    if (currentUser.friends.includes(targetUserId)) {
      return res.status(400).json({ message: 'You are already friends with this user.' })
    }

    if (targetUser.friendRequests.includes(currentUserId)) {
      return res.status(400).json({ message: 'You have already sent a friend request.' })
    }

    // add currentUser to targetUser friendRequests
    const updatedTargetUserFriendRequests = [...targetUser.friendRequests, currentUserId];
    targetUser.friendRequests = updatedTargetUserFriendRequests;
    const updatedTargetUser = await targetUser.save();
    return res.status(201).json({ message: 'Friend request sent!', potentialFriend: updatedTargetUser })

  } catch (error) {
    return res.status(500).json({ message: 'Oops, something went wrong.', error: error.message });
  }
});

/* DELETE cancel friend request */
router.delete('/req/:targetUserId', async (req, res, next) => {
  const currentUserId = req.payload.id;
  const targetUserId = req.params.targetUserId;
  try {
    const targetUser = await User.findById(targetUserId);

    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: 'You cannot friend request yourself.' })
    }

    // remove friendRequest 
    const updatedTargetUserFriendRequests = targetUser.friendRequests.filter((user) => user != currentUserId);
    targetUser.friendRequests = updatedTargetUserFriendRequests;
    const updatedTargetUser = await targetUser.save();
    return res.status(201).json({ message: 'Friend request removed.', potentialFriend: updatedTargetUser })

  } catch (error) {
    return res.status(500).json({ message: 'Oops, something went wrong.', error: error.message });
  }
});

/* POST accept friend request */
router.post('/accept/:newFriendId', async (req, res, next) => {
  const currentUserId = req.payload.id;
  const newFriendId = req.params.newFriendId;
  try {
    const currentUser = await User.findById(currentUserId);
    const newFriend = await User.findById(newFriendId);

    if (!currentUser.friendRequests.includes(newFriendId)) {
      return res.status(400).json({ message: 'Friend request not found.' })
    }

    if (currentUser.friends.includes(newFriendId)) {
      return res.status(400).json({ message: 'You are already friends with this user.' })
    }

    // remove friend request 
    const updatedFriendRequests = currentUser.friendRequests.filter((friendRequest) => friendRequest != newFriendId);
    currentUser.friendRequests = updatedFriendRequests;
    await currentUser.save();

    // add newFriend to currentUser friend list
    const updatedCurrentUserFriends = [...currentUser.friends, newFriendId];
    currentUser.friends = updatedCurrentUserFriends;
    await currentUser.save()

    // add currentUser to newFriend friend list
    const updatedNewFriendFriends = [...newFriend.friends, currentUserId];
    newFriend.friends = updatedNewFriendFriends;
    await newFriend.save()

    // return currentUser's updated friends list as confirmation
    const updatedCurrentUserAndFriends = await User.findById(currentUserId).populate('friends');
    return res.status(201).json({ message: 'New friend added..', currentUser: updatedCurrentUserAndFriends })

  } catch (error) {
    return res.status(500).json({ message: 'Oops, something went wrong.', error: error.message });
  }
});

/* POST decline friend request (not used) */
router.post('/decline/:rejectedFriendId', async (req, res, next) => {
  const currentUserId = req.payload.id;
  const rejectedFriendId = req.params.rejectedFriendId;
  try {
    const currentUser = await User.findById(currentUserId);

    if (!currentUser.friendRequests.includes(rejectedFriendId)) {
      return res.status(400).json({ message: 'Friend request not found.' })
    }

    // remove friend request
    const updatedFriendRequests = currentUser.friendRequests.filter((user) => user != rejectedFriendId);
    currentUser.friendRequests = updatedFriendRequests;

    // return currentUser's friend requests to confirm request removal
    const updatedCurrentUser = await currentUser.save();
    return res.status(201).json({ message: 'Friend request declined.', currentUser: updatedCurrentUser })

  } catch (error) {
    return res.status(500).json({ message: 'Oops, something went wrong.', error: error.message });
  }
});

/* DELETE remove friend  */
router.delete('/remove/:removedFriendId', async (req, res, next) => {
  const currentUserId = req.payload.id;
  const removedFriendId = req.params.removedFriendId;
  try {
    const currentUser = await User.findById(currentUserId);
    const removedFriend = await User.findById(removedFriendId);

    if (!currentUser.friends.includes(removedFriendId)) {
      return res.status(400).json({ message: 'You must be friends to remove a friend.' })
    }

    // remove currentUser from removedFriends friend list
    const updatedRemovedFriendFriends = removedFriend.friends.filter((user) => user._id != currentUserId);
    removedFriend.friends = updatedRemovedFriendFriends;
    await removedFriend.save()

    // remove removedFriend from currentUsers friend list
    const updatedCurrentUserFriends = currentUser.friends.filter((user) => user._id != removedFriendId);
    currentUser.friends = updatedCurrentUserFriends;
    await currentUser.save()

    // return currentUser as confirmation of removal
    const updatedCurrentUser = await User.findById(currentUserId);
    return res.status(201).json({ message: 'Friend removed.', currentUser: updatedCurrentUser })

  } catch (error) {
    return res.status(500).json({ message: 'Oops, something went wrong.', error: error.message });
  }
});

/* POST add users to friendRequest list  */
// this is causing issues, cant login after this
router.post('/populate', async (req, res, next) => {
  const currentUserId = req.payload.id;
  let otherUserList = [];
  try {
    const currentUser = await User.findById(currentUserId);
    const otherUsers = await User.find();
    otherUserList = otherUsers.filter((u) => u.id != currentUser.id );
    otherUserListIds = otherUserList.map((u) => u._id);

    const updatedFriendRequests = [...currentUser.friendRequests, otherUserListIds];
    currentUser.friendRequests = updatedFriendRequests;
    await currentUser.save();

    return res.status(201).json({ message: 'Friend Request list populated', currentUser });

  } catch (error) {
    return res.status(500).json({ message: 'Oops, something went wrong.', error: error.message });
  }
});

module.exports = router;
