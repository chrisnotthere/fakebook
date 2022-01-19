const express = require('express');
const router = express.Router();
var User = require("../../models/user");
const generateJWT = require('../../utils/generateJWT');
const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");
const friendsRouter = require('./friends');

router.use('/friends', friendsRouter);
// router.use(passport.authenticate())

/* GET all users */
router.get('/', function (req, res, next) {
  res.json({ message: "GET all users - not implemented" })
});

/* POST logout */
router.post('/logout', function (req, res, next) {
  res.json({ message: "POST logout of user account - not implemented" })
});

/* GET one user */
router.get('/:id', function (req, res, next) {
  res.json({ message: "GET a specific user - not implemented" })
});

/* PUT update profile details */
router.put('/:id', function (req, res, next) {
  res.json({ message: "PUT edit user details - not implemented" })
});

/* PUT update profile picture */
router.put('/:id/image', function (req, res, next) {
  res.json({ message: "POST edit profile pic - not implemented" })
});

/* DELETE user */
router.delete('/:id', function (req, res, next) {
  res.json({ message: "DELETE user account - not implemented" })
});

module.exports = router;
