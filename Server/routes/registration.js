require("dotenv").config();
const express = require("express");
const Registration = require("../models/registration");
const Users = require("../models/user");
const UserReg = require("../models/userReg");
// const jwt = require("jsonwebtoken");
// const eventDetails = require("../models/eventDetails");
const router = express.Router();
const mongoose = require("mongoose");
// const ObjectId = mongoose.Types;
// const bcrypt = require("bcrypt");
const checkPoint = require("../middleware/check_auth");
const checkuserDet = require("../middleware/checkuserDet");
// const KEY = require("../../backend");

mongoose.Promise = global.Promise;

router.post("/getdetails", checkPoint, (req, res) => {
  // console.log(req.body.regIds);
  Registration.find({
      _id: {
        $in: req.body.regIds
      }
    })
    .exec()
    .then(result => {
      return res.status(200).json({
        details: result
      });
    })
    .catch(err => {
      return res.status(500).json({
        messege: "Can't fetch registration details",
        error: err
      });
    });
})

router.post(
  "/register",
  checkPoint,
  checkuserDet,
  // checkuserRegEvents,
  // addingRegEvents,
  (req, res) => {

    let registration = new Registration({
      _id: new mongoose.Types.ObjectId(),
      teamname: req.body.teamname,
      evename: req.body.evename,
      eveId: req.body.eveId,
      participants: req.body.participants,
      payAmt: req.body.payAmt,
      paymentStatus: false,
    });
    registration
      .save()
      .then((result) => {
        console.log("Reg result", result);
        let operations = req.body.participants.map(user => {
          return {
            updateOne: {
              filter: {
                email: user.email
              },
              update: {
                $push: {
                  registeredEvents: req.body.evename,
                  // registrationIDs: registration._id
                },
                $push: {
                  registeredEvents: req.body.evename,
                  registrationIDs: registration._id
                },
              }
            }
          }
        });
        Users.bulkWrite(operations, {}, (err, result) => {
          if (err) {
            return res.status(500).json({
              messege: "Cannot register",
              error: err
            });
          } else {
            console.log(result);
            return res.status(200).json({
              messege: "Registration Successful",
              result: result,
              regId: registration._id
            });
          }
        });

      })
      .catch((err) => {
        return res.status(500).json({
          messege: "Could not register for the event",
          error: err,
        });
      });
  }
);
module.exports = router;