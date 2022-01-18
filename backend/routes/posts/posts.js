var express = require('express');
var router = express.Router();
var Post = require("../../models/post");
var User = require("../../models/user");
var Comment = require("../../models/comment");

const commentsRouter = require('./comments');

router.use('/comments', commentsRouter);

/* GET posts for timeline */
router.get('/', function(req, res, next) {

  // list of all posts    **edit this to only get posts from self and friends**
  Post.find()
  .sort([["date", "ascending"]])
  .populate({ path: 'user', select: 'firstName lastName' })
  .populate({ path: 'comments', select: 'user text' })
  .populate({
    path: "comments",
    select: "text likes",
  })  
  // .populate('likes')
  .exec(function (err, results) {
    if (err) {
      return next(err);
    }
    //Successful, so send data
    res.status(200).json({ results })
  });
  // next();

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
