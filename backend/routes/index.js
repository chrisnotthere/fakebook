var express = require('express');
var router = express.Router();
var Post = require("../models/post");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: "hello from the server" })
});

module.exports = router;
