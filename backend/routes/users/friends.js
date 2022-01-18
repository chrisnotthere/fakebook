var express = require('express');
var router = express.Router();

/* POST friend request */
router.post('/req', function(req, res, next) {
  res.json({ message: "POST req - post a friend request" })
});

/* DELETE cancel friend request */
router.delete('/req', function(req, res, next) {
  res.json({ message: "DELETE req - remove friend request" })
});

/* POST accept friend request */
router.post('/accept', function(req, res, next) {
  res.json({ message: "POST accept friend request" })
});

/* POST decline friend request */
router.post('/decline', function(req, res, next) {
  res.json({ message: "POST decline friend request" })
});

/* DELETE remove friend  */
router.delete('/remove', function(req, res, next) {
  res.json({ message: "DELETE friend/un-friend" })
});

module.exports = router;
