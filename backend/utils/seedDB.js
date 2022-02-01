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

function userCreate(email, password, firstName, lastName, picture, coverPicture, about, friends, friendRquests, cb) {
  userdetail = { email, password, firstName, lastName, picture, coverPicture, about, friends, friendRquests };

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

// email, password, firstName, lastName, picture, coverPicture, about, friends, friendRquests
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
          'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MA_00086499__ftn7gq.jpg',
          'Dont take life too seriously. Youll never get out alive!',
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
          'https://content.osgnetworks.tv/petersenshunting/content/photos/looney-tunes-thats-all-folks-770x450.jpg',
          'I am a duck bent on self-preservation.',
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
          'https://image.freepik.com/free-vector/empty-background-nature-scene-backgroundry_1308-32605.jpg',
          'Youll never take me alive!',
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
          'https://images.unsplash.com/photo-1586672806791-3a67d24186c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y292ZXIlMjBhcnR8ZW58MHx8MHx8&w=1000&q=80',
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
          'https://timelinecovers.pro/facebook-cover/download/Best-Covers-For-Facebook-Timeline-sunflower.jpg',
          'The Official FakeBook account.',
          [],
          [],
          callback
        );
      },
      function (callback) {
        userCreate(
          'pepe@gmail.com',
          '123456',
          'Pepé',
          'Le Pew',
          'https://pbs.twimg.com/profile_images/755933246433538048/BxFTTi_d_400x400.jpg',
          'https://www.messynessychic.com/wp-content/uploads/2017/07/19388634_10207472213283522_3655420329281554494_o.jpg',
          'You know, eet eez possible to be too attractive!',
          [],
          [],
          callback
        );
      },
      function (callback) {
        userCreate(
          'stan@gmail.com',
          '123456',
          'Stan',
          'Podolak',
          'https://www.personality-database.com/profile_images/65611.png',
          'https://www.julienslive.com/images/lot/3867/386701_0.jpg?1634123065',
          'Well, I may not be very tall, but... Im slow.',
          [],
          [],
          callback
        );
      },
      function (callback) {
        userCreate(
          'bill@gmail.com',
          '123456',
          'Bill',
          'Murray',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPVW7ABVxPngexH4R9XWNg9JTpU2IfI057bw&usqp=CAU',
          'https://media.audleytravel.com/-/media/images/home/north-asia-and-russia/japan/places/tokyo_bay_japan_1017419.jpg',
          '',
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
          'What a view!',
          [],
          [users[0], users[1], users[2], users[4]],
          1642495557254,
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
          1502475557488,
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
      function (callback) {
        postCreate(
          users[7],
          'Common sense is like deodorant. The people who need it most never use it.',
          [comments[5], comments[6]],
          [users[0], users[1], users[2], users[4], users[3], users[7]],
          1142421557990,
          '',
          callback
        );
      },
      function (callback) {
        postCreate(
          users[5],
          'Permit me to introduce myself. I am Pepe Le Pew, your lover.',
          [],
          [users[0]],
          1542311957990,
          '',
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
      function (callback) {
        commentCreate(
          users[5],
          "What are you trying to say??",
          [],
          1642475557920,
          callback
        );
      },
      function (callback) {
        commentCreate(
          users[6],
          "LOL!",
          [users[0], users[1], users[2]],
          1642475569999,
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
