const express = require("express");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const gravatar = require("gravatar");

// Model
const User = require("../models/User");
const Notifications = require("../models/Notification");

// key for JWT token
const key = require("../config/keys").secretOrKey;

// load input validation
const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");

const router = express.Router();

// @route  GET users/register
// @desc   Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).send(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).send(errors);
    }
    const avatar = gravatar.url(req.body.email, {
      s: "200", // size
      r: "pg", // rating
      d: "mm" // default
    });
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password,
      role: req.body.role
    });
    bycrypt.genSalt(10, (err, salt) => {
      bycrypt.hash(newUser.password, salt, (err, hashPassword) => {
        if (err) {
          throw err;
        }
        newUser.password = hashPassword;
        newUser
          .save()
          .then(user => {
            const newNotification = new Notifications({
              user: user._id,
              message: "Welcome to the Recruitment Portal"
            });
            newNotification.save();
            return res.send(user);
          })
          .catch(err => console.log(err));
      });
    });
  });
});

// @route  POST users/login
// @desc   Login User / Returning JWT Token route
// @access Public
router.post("/login", (req, res) => {
  // validation
  const { errors, isValid } = validateLoginInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).send(errors);
  }
  const { email, password, role } = req.body;
  // find by email
  User.findOne({
    email
  }).then(user => {
    // check if email exists
    if (!user) {
      errors.email = "User not found";
      return res.status(400).send(errors);
    }
    // check if role is correct
    if (role !== user.role) {
      errors.email = "User not found";
      return res.status(400).send(errors);
    }

    // comparing password with Hash password
    bycrypt.compare(password, user.password).then(isMatch => {
      // user found
      if (isMatch) {
        // creating payload for JWT
        const payload = {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          role: user.role
        };
        // sign Token
        jwt.sign(payload, key, (err, token) => {
          res.status(200).send({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.email = "User not found";
        return res.status(400).send(errors);
      }
    });
  });
});

// @route  GET users/currentuser
// @desc   Return current user
// @access Private
router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // current user
    res.send(req.user);
  }
);

module.exports = router;
