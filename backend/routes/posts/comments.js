var express = require('express');
var router = express.Router();

/* POST comment */
router.post('/', function(req, res, next) {
  res.json({ message: "POST comment - not implemented" })
});

/* DELETE comment */
router.delete('/:id', function(req, res, next) {
  res.json({ message: "DELETE comment - not implemented" })
});

/* PUT toggle like comment */
router.put('/:id/like', function(req, res, next) {
  res.json({ message: "PUT like/unlike comment" })
});

module.exports = router;
