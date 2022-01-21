var express = require('express');
var router = express.Router();
const commentsRouter = require('./comments');
var Post = require("../../models/post");
var User = require("../../models/user");
var Comment = require("../../models/comment");
const passport = require('passport');
const getToken = require('../../utils/getToken')

router.use('/comments', commentsRouter);

router.use(passport.authenticate(["jwt", "facebook-token"], { session: false }));
router.use(getToken);

/* GET timeline posts */
router.get('/', async (req, res, next) => {
  try {
    // list of timeline posts - (self posts and posts of friends)
    const currentUser = await User.findById(req.payload.id);
    const timelinePosts = await   Post.find({ user: [req.payload.id, ...currentUser.friends] })
    .sort("-timestamp")
    .populate({ path: 'user', select: 'firstName lastName' })
    .populate({ path: 'comments', select: 'user text likes' })
    .populate({ path:'likes', select: 'firstName lastName' })

    return res.status(200).json({ timelinePosts })

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

/* POST create new post */
router.post('/', function(req, res, next) {
  res.json({ message: "POST create new post" })
});

/* GET specific post */
router.get('/:id', function(req, res, next) {
  res.json({ message: "POST get a single post" })
});

/* PUT update post */
router.put('/:id', function(req, res, next) {
  res.json({ message: "PUT edit post" })
});

/* PUT like/unlike toggle */
router.put('/:id/like', function(req, res, next) {
  res.json({ message: "PUT toggle like post" })
});

/* DELETE post */
router.delete('/:id', function(req, res, next) {
  res.json({ message: "DELETE post" })
});

module.exports = router;
