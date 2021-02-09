require("dotenv").config();
const express = require("express");
const Users = require("../models/user");
const jwt = require("jsonwebtoken");
// const eventDetails = require("../models/eventDetails");
const router = express.Router();
const mongoose = require("mongoose");
// const ObjectId = mongoose.Types;
const bcrypt = require("bcrypt");
// const process = require('');
const KEY = require("../../backend");

mongoose.Promise = global.Promise;

router.post("/signup", (req, res, next) => {
  Users.find({
      email: req.body.email,
    })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          messege: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 2, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new Users({
              // _id: new mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash,
              contact: req.body.contact,
              clgname: req.body.clgname,
              registeredEvents: [],
              registrationIDs: []
            });
            user
              .save()
              .then((result) => {
                // console.log(result);
                return res.status(200).json({
                  messege: "User Created",
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

router.post("/login", (req, res, next) => {
  Users.find({
      email: req.body.email,
    })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          messege: "Authentication failed",
        });
      }
      //   console.log(user);
      //   console.log(KEY);
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        // console.log(err, result);
        if (result) {
          const token = jwt.sign({
              email: user[0].email,
              userId: user[0]._id,
            },

            KEY, {
              expiresIn: "4h",
            }
          );

          return res.status(200).json({
            messege: "Auth Successful",
            token: token,
            expiresIn: "14400",
            userId: user[0]._id,
            email: user[0].email,
            name: user[0].firstname + " " + user[0].lastname,
            clgname: user[0].clgname,
            contact: user[0].contact,
            registeredEvents: user[0].registeredEvents,
            registrationIDs: user[0].registrationIDs
          });
        } else if (err) {
          console.log("Error is: ", err);
          return res.status(401).json({
            messege: "Authentication failed",
            error: err,
          });
        } else {
          return res.status(400).json({
            messege: "Login Failed",
          });
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

router.delete("/remove/:userId", (req, res, next) => {
  Users.remove({
      _id: req.params.userId,
    })
    .exec()
    .then((result) => {
      return res.status(200).json({
        messege: "User deleted",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;