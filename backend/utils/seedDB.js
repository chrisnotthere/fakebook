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
  async.parallel(
    [
      function (callback) {
        userCreate(
          'bugs@yahoo.com',
          '123456',
          'Bugs',
          'Bunny',
          'bugs.jpg',
          'Bugs Bunny is an animated cartoon character, created in the late 1930s by Leon Schlesinger Productions and voiced originally by Mel Blanc. Bugs is best known for his starring roles in the Looney Tunes and Merrie Melodies series of animated short films, produced by Warner Bros.',
          [],
          [],
          callback
        );
      },
      function (callback) {
        userCreate(
          'daffs@gmail.com',
          'daffs1',
          'Daffy',
          'Duck',
          'daffy.png',
          'Daffy Duck is an animated cartoon character created by Warner Bros. Styled as an anthropomorphic black duck, he has appeared in cartoon series such as Looney Tunes and Merrie Melodies, in which he is usually depicted as a foil for Bugs Bunny.',
          [],
          [],
          callback
        );
      },
      function (callback) {
        userCreate(
          'email@email.com',
          'blahblah123',
          'Test',
          'Account',
          'anon.png',
          'This is a test account. Feel free to take a look around.',
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
  async.parallel(
    [
      function (callback) {
        postCreate(
          users[0],
          'Wow, is this a fake Facebook Post? Damn it looks so real!',
          [comments[0], comments[1]],
          [users[0], users[1]],
          1642475557488,
          '',
          callback
        );
      },
      function (callback) {
        postCreate(
          users[1],
          'This is a test.',
          [],
          [],
          1642475557110,
          '',
          callback
        );
      },
      function (callback) {
        postCreate(
          users[1],
          'Live free and Die Hard.',
          [],
          [users[0], users[1], users[2]],
          1642475557854,
          'https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
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
