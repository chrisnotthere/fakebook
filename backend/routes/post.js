var express = require('express');
var router = express.Router();
var Post = require("../models/post");
var User = require("../models/user");
var Comment = require("../models/comment");

/* GET posts */
router.get('/', function(req, res, next) {

  // list of all posts
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

module.exports = router;
