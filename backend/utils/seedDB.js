#! /usr/bin/env node

console.log(
  'This script populates test data. Specified database as argument - e.g.: seedDB mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var posts = [];
var comments = [];

function userCreate(email, password, firstName, lastName, picture, about, friends, friendRquests, cb) {
  userdetail = { email, password, firstName, lastName, picture, about, friends, friendRquests };

  const user = new User(userdetail);
  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New user: ' + user);
    users.push(user);
    cb(null, user);
  });
}

function postCreate(user, text, comments, likes, timestamp, image, cb) {
  postdetail = { user, text, comments, likes, timestamp, image };

  const post = new Post(postdetail);
  post.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New post: ' + post);
    posts.push(post);
    cb(null, post);
  });
}

function commentCreate(user, text, likes, timestamp, cb) {
  commentdetail = { user, text, likes, timestamp, };

  const comment = new Comment(commentdetail);
  comment.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New comment: ' + comment);
    comments.push(comment);
    cb(null, comment);
  });
}

// email, password, firstName, lastName, picture, about, friends, friendRquests
function createusers(cb) {
  async.series(
    [
      function (callback) {
        userCreate(
          'bugs@gmail.com',
          '123456',
          'Bugs',
          'Bunny',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRktqm_1eM2Ruq4WJlKIzMkGs6wQCWLkDbUVg&usqp=CAU',
          'Bugs Bunny is an animated cartoon character, created in the late 1930s by Leon Schlesinger Productions and voiced originally by Mel Blanc. Bugs is best known for his starring roles in the Looney Tunes and Merrie Melodies series of animated short films, produced by Warner Bros.',
          [],
          [],
          callback
        );
      },
      function (callback) {
        userCreate(
          'daffs@gmail.com',
          '123456',
          'Daffy',
          'Duck',
          'http://2.bp.blogspot.com/-g2yqwwzR-lo/T9TtXCI2i0I/AAAAAAAAEqA/9QiEvUMnMm0/s1600/Walt_disney_Daffy_duck_head_wallpaper_1.jpg',
          'Daffy Duck is an animated cartoon character created by Warner Bros. Styled as an anthropomorphic black duck, he has appeared in cartoon series such as Looney Tunes and Merrie Melodies, in which he is usually depicted as a foil for Bugs Bunny.',
          [],
          [],
          callback
        );
      },
      function (callback) {
        userCreate(
          'fudd@gmail.com',
          '123456',
          'Elmer',
          'Fudd',
          'https://static.tvtropes.org/pmwiki/pub/images/elmer_fudd.jpg',
          'Elmer J. Fudd is an animated cartoon character in the Warner Bros. Looney Tunes/Merrie Melodies series and the archenemy of Bugs Bunny. He has one of the more disputed origins in the Warner Bros. cartoon pantheon (second only to Bugs himself).',
          [],
          [],
          callback
        );
      },
      function (callback) {
        userCreate(
          'guest@gmail.com',
          '123456',
          'Guest',
          'Account',
          'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png',
          'This is a guest account. Feel free to take a look around.',
          [],
          [],
          callback
        );
      },
      function (callback) {
        userCreate(
          'fakebook@gmail.com',
          '123456',
          'FakeBook',
          'Official',
          'https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/-UrAiCz94rq.png',
          'The Official FakeBook account.',
          [],
          [],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

// user, text, comments, likes, timestamp, image
function createposts(cb) {
  async.series(
    [
      function (callback) {
        postCreate(
          users[1],
          'Wow, is this a fake Facebook Post? It looks so real!',
          [comments[0], comments[1]],
          [users[1]],
          1642475557488,
          '',
          callback
        );
      },
      function (callback) {
        postCreate(
          users[0],
          'Live free and Die Hard.',
          [],
          [users[0], users[1], users[2], users[4]],
          1642475557854,
          'https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
          callback
        );
      },
      function (callback) {
        postCreate(
          users[2],
          'Just wait till I get my hands on that scwewy wabbit and that scwewball duck!',
          [comments[2], comments[3]],
          [users[2]],
          1642475557488,
          '',
          callback
        );
      },
      function (callback) {
        postCreate(
          users[4],
          'Welcome to FakeBook',
          [comments[4]],
          [users[0], users[1], users[2], users[4]],
          1642475557990,
          'https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495__480.jpg',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

// user, text, likes, timestamp
function createcomments(cb) {
  async.series(
    [
      function (callback) {
        commentCreate(
          users[1],
          "Don't let it worry ya, Skipper. I'm just a crazy, darn fool duck. Hoo-hoo Hoo-hoo-hoo-hoo...",
          [users[1]],
          1642475557291,
          callback
        );
      },
      function (callback) {
        commentCreate(
          users[0],
          "I knew I shoulda taken that left turn at Albuquerque!",
          [users[0], users[1]],
          1642475557299,
          callback
        );
      },
      function (callback) {
        commentCreate(
          users[0],
          "For shame, doc. Hunting rabbits with an elephant gun. Why don’t you shoot yourself an elephant?",
          [users[0], users[1]],
          1642475557299,
          callback
        );
      },
      function (callback) {
        commentCreate(
          users[1],
          "Go on! Shoot me again! I enjoy it! I love the smell of burnt feathers and gunpowder and cordite!",
          [users[0], users[1]],
          1642475557299,
          callback
        );
      },
      function (callback) {
        commentCreate(
          users[2],
          "Be vewy vewy quiet, I’m hunting wabbits!, He-e-e-e-e!",
          [],
          1642475557999,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createusers, createcomments, createposts],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('posts: ' + posts);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
