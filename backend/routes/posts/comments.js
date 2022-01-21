var express = require('express');
var router = express.Router({ mergeParams: true });
const passport = require('passport');
const User = require('../../models/user');
const Comment = require('../../models/comment');
const Post = require('../../models/post');
const getToken = require('../../utils/getToken')
const { body, validationResult } = require("express-validator");

// user must have a valid token to access routes below this point
router.use(
  passport.authenticate(["jwt", "facebook-token"], { session: false })
);
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
      return res.status(201).json({ message: 'Comment saved!', comment: showComment})

    } catch (error) {
      return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
    }
  });

/* DELETE comment */
router.delete('/:id', async (req, res, next) => {
  res.json({ message: "DELETE comment - not implemented" })
});

/* PUT toggle like comment */
router.put('/:id/like', async (req, res, next) => {
  res.json({ message: "PUT like/unlike comment" })
});

module.exports = router;
