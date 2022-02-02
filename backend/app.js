require('dotenv').config()
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

// set up mongoose connection
require('./config/mongoConfig');

const authRouter = require('./routes/authenticate');
const userRouter = require('./routes/users/users');
const postRouter = require('./routes/posts/posts');

const app = express();

app.use(bodyParser.json());

// define routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

// handle 404 
app.use(function (req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors);
app.use(compression());   // compress all routes
app.use(helmet());        // helps protect against vulnerabilites

const whitelist = ['http://localhost:3000', 'https://chrisnotthere.github.io'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)
      callback(new Error('Not allowed by CORS'));
  }
}
app.use(cors(corsOptions));


module.exports = app;
