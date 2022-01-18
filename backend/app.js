require('dotenv').config()
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

// set up mongoose connection
require('./config/mongoConfig');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');

const app = express();

app.use('/', indexRouter);
app.use('/posts', postRouter);

app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(bodyParser.json())
app.use(compression());   // compress all routes
app.use(helmet());        // helps protect against vulnerabilites
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
