var express = require('express');
var router = express.Router();
const commentsRouter = require('./comments');
var Post = require("../../models/post");
var User = require("../../models/user");
var Comment = require("../../models/comment");
const passport = require('passport');
const getToken = require('../../utils/getToken')
const { body, validationResult } = require("express-validator");

router.use('/comments', commentsRouter);

router.use(passport.authenticate(["jwt", "facebook-token"], { session: false }));
router.use(getToken);

/* GET timeline posts */
router.get('/', async (req, res, next) => {
  try {
    // list of timeline posts - (self posts and posts of friends)
    const currentUser = await User.findById(req.payload.id);
    const timelinePosts = await Post.find({ user: [req.payload.id, ...currentUser.friends] })
      .sort("-timestamp")
      .populate({ path: 'user', select: 'firstName lastName' })
      .populate({ path: 'comments', select: 'user text likes' })
      .populate({ path: 'likes', select: 'firstName lastName' })

    return res.status(200).json({ timelinePosts })

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

/* POST create new post */
router.post('/',
  body('text', 'Your post must contain text.').trim().isLength({ min: 1 }),
  async (req, res, next) => {
    // check that the post contains text
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const postText = req.body.text;
      const newPost = new Post({ user: req.payload.id, text: postText })
      const savedPost = await newPost.save();

      // check if saved post is now in the db
      const foundPost = await Post.findById(savedPost._id);
      if (foundPost) return res.status(201).json({ message: 'Post saved!', foundPost });
      else res.status(500).json({ message: "Oops, something went wrong." });

    } catch (error) {
      return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
    }
  });

/* GET specific post */
router.get('/:id', async (req, res, next) => {
  res.json({ message: "POST get a single post" })
});

/* PUT update post */
router.put('/:id', async (req, res, next) => {
  res.json({ message: "PUT edit post" })
});

/* PUT like/unlike toggle */
router.put('/:id/like', async (req, res, next) => {
  res.json({ message: "PUT toggle like post" })
});

/* DELETE post */
router.delete('/:id', async (req, res, next) => {
  res.json({ message: "DELETE post" })
});

module.exports = router;
