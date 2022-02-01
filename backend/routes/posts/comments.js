const express = require('express');
const router = express.Router({ mergeParams: true });
const { body, validationResult } = require("express-validator");
const passport = require('passport');
const getToken = require('../../utils/getToken')
const Post = require('../../models/post');
const Comment = require('../../models/comment');

// user must have a valid token to access routes below this point
router.use(passport.authenticate(["jwt", "facebook-token"], { session: false }));
router.use(getToken);

/* POST comment */
router.post('/',
  body('text', 'Your comment must contain text.').trim().isLength({ min: 1 }),
  async (req, res, next) => {
    const currentUserId = req.payload.id;
    const { text } = req.body;
    // check that the comment contains text
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // create and save cpmment
      const newComment = new Comment({ user: currentUserId, text: text })
      const savedComment = await newComment.save();

      const targedPost = await Post.findById(req.params.postId);
      targedPost.comments.push(savedComment);
      await targedPost.save();

      const showComment = await Comment.findById(savedComment._id).populate('user');
      return res.status(201).json({ message: 'Comment saved!', comment: showComment })

    } catch (error) {
      return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
    }
  });

/* DELETE comment (not used) */
router.delete('/:id', async (req, res, next) => {
  try {
    const currentUserId = req.payload.id;
    const comment = await Comment.findById(req.params.id)
    // check if comment exists
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' })
    }
    // check if currentUser is the comment owner
    if (comment.user != currentUserId) {
      return res.status(401).json({ message: "You may only delete your own comment." });
    }
    // delete the comment
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (deletedComment) {
      return res.status(201).json({ message: 'Comment has been deleted.', deletedComment })
    }
  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

/* PUT toggle like comment */
router.put('/:id/like', async (req, res, next) => {
  try {
    const currentUserId = req.payload.id;
    const comment = await Comment.findById(req.params.id)
    // check if comment exists
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' })
    }
    //un-like if comment already liked
    if (comment.likes.includes(currentUserId)) {
      const commentLikes = [...comment.likes];
      const updatedCommentLikes = commentLikes.filter((likeId) => likeId != currentUserId);

      comment.likes = updatedCommentLikes;
      const updatedComment = await comment.save()

      return res.status(201).json({ message: 'Like removed!', comment: updatedComment });

    } else {
      // like comment if not liked already
      comment.likes.push(currentUserId);
      const updatedComment = await comment.save()

      return res.status(201).json({ message: 'Comment liked!', comment: updatedComment })
    }
  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

module.exports = router;
