var express = require('express');
var router = express.Router();
const commentsRouter = require('./comments');
var Post = require("../../models/post");
var User = require("../../models/user");
var Comment = require("../../models/comment");
const passport = require('passport');
const getToken = require('../../utils/getToken')
const { body, validationResult } = require("express-validator");

// router.use('/comments', commentsRouter);
router.use("/:postId/comments", commentsRouter);

router.use(passport.authenticate(["jwt", "facebook-token"], { session: false }));
router.use(getToken);

/* GET timeline posts */
router.get('/', async (req, res, next) => {
  try {
    // list of timeline posts - (self posts and posts of friends)
    const currentUser = await User.findById(req.payload.id);
    const timelinePosts = await Post.find({ user: [req.payload.id, ...currentUser.friends] })
      .sort("-timestamp")
      .populate({ path: 'user', select: 'firstName lastName picture' })
      .populate({ path: 'comments', select: 'user text likes' })
      .populate({ path: 'likes', select: 'firstName lastName' })

    return res.status(200).json({ timelinePosts, currentUser })

  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

/* GET posts belonging to specific user */
router.get('/:id', async (req, res, next) => {
  try {
    // list of user's posts - (self posts only)
    const currentUser = await User.findById(req.params.id);
    const userPosts = await Post.find({ user: req.params.id })
      .sort("-timestamp")
      .populate({ path: 'user', select: 'firstName lastName picture' })
      .populate({ path: 'comments', select: 'user text likes' })
      .populate({ path: 'likes', select: 'firstName lastName' })

    return res.status(200).json({ userPosts, currentUser })

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
      const postImage = req.body.image;
      const newPost = new Post({ user: req.payload.id, text: postText, image: postImage })
      const savedPost = await newPost.save();

      // check if saved post is now in the db
      const foundPost = await Post.findById(savedPost._id);
      if (foundPost) return res.status(201).json({ message: 'Post saved!', foundPost });
      else res.status(500).json({ message: "Oops, something went wrong." });

    } catch (error) {
      return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
    }
  });

// /* GET specific post - must be the creator or a friend to see the post*/
// // NOTE: this requires testing
// router.get('/:id', async (req, res, next) => {
//   // res.json({ message: "POST get a single post" })
//   try {
//     const currentUserId = req.payload.id;
//     const currentUser = await User.findById(req.payload.id).populate('friends');
//     const post = await Post.findById(req.params.id)
//       .populate({ path: 'user', select: 'firstName lastName' })
//       .populate({ path: 'comments', select: 'user text likes' })
//       .populate({ path: 'likes', select: 'firstName lastName' });

//     // check if post exists
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' })
//     }
//     // console.log('current-----' + currentUser)
//     // console.log('post.user ----------' + post.user.id)
//     // console.log(post.user.id == currentUserId)
//     // console.log(currentUser.friends.includes(post.user.id))
//     // check if currentUser has permission to view post
//     if (post.user.id == currentUserId || currentUser.friends.includes(post.user)) {
//       // return the post 
//       return res.status(200).json({ post })

//     } else {
//       return res.status(401).json({ message: "You must be friends with the creator to view this post" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
//   }
// });

/* PUT update post */
// LOW PRIORITY
router.put('/:id', async (req, res, next) => {
  res.json({ message: "PUT edit post" })
});

/* PUT like/unlike toggle */
router.put('/:id/like', async (req, res, next) => {
  try {
    const currentUserId = req.payload.id;
    const post = await Post.findById(req.params.id)
    // check if post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    //un-like if post already liked
    if (post.likes.includes(currentUserId)) {
      const postLikes = [...post.likes];
      const updatedPostLikes = postLikes.filter((likeId) => likeId != currentUserId);

      post.likes = updatedPostLikes;
      const updatedPost = await post.save()

      return res.status(201).json({ message: 'Like removed!', post: updatedPost });

    } else {
      // like post if not liked already
      post.likes.push(currentUserId);
      const updatedPost = await post.save()

      return res.status(201).json({ message: 'Post liked!', post: updatedPost })
    }
  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

/* DELETE post */
router.delete('/:id', async (req, res, next) => {
  try {
    const currentUserId = req.payload.id;
    const post = await Post.findById(req.params.id)
    // check if post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' })
    }
    // check if currentUser is the post owner
    if (post.user != currentUserId) {
      return res.status(401).json({ message: "You may only delete your own posts." });
    }
    // delete the post
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if(deletedPost) {
      return res.status(201).json({ message: 'Post has been deleted.'})
    }
  } catch (error) {
    return res.status(500).json({ message: "Oops, something went wrong.", error: error.message });
  }
});

module.exports = router;
