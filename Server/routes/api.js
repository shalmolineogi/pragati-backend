const express = require("express");
const schedule = require("../models/schedule");
const events = require("../models/eventType");
const eventDetails = require("../models/eventDetails");
const router = express.Router();
const mongoose = require("mongoose");
const {
  ObjectId
} = mongoose.Types;
mongoose.Promise = global.Promise;

// const conn = mongoose.connect(
//   "mongodb://127.0.0.1:27017/TechFest",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else console.log("DB Connected");
//   }
// );

router.get("/schedule/all", (req, res) => {
  console.log("Getting all schedules");
  schedule.find({}).exec((err, schedules) => {
    if (err) {
      console.log(err);
    } else {
      res.json(schedules);
    }
  });
});

router.post("/schedule/create", (req, res) => {
  console.log("Inserting new schedule");
  var newSchedule = new schedule();
  newSchedule.name = req.body.name;
  newSchedule.venue = req.body.venue;
  newSchedule.date = req.body.date;
  newSchedule.starttime = req.body.starttime;
  newSchedule.endtime = req.body.endtime;
  newSchedule.save((err, insertedSchedule) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Error in Schedule Insertion",
      });
    } else {
      return res.json(insertedSchedule);
    }
  });
});

router.get("/events/eventTypes", (req, res) => {
  console.log("Getting all types of events");
  events.find({}).exec((err, eveTypes) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Can't get eventTypes",
      });
    } else {
      res.json(eveTypes);
    }
  });
});

router.param("eventid", (req, res, next, id) => {
  // console.log(id);

  req.body.eventId = id;

  next();
});

router.get("/events/eventTypes/:eventid", (req, res) => {
  console.log("Getting detail of events of a particular type");
  eventDetails
    .find({
      ref: ObjectId(req.body.eventId),
    })
    .exec((err, eveDetails) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Can't get eventTypesDetail",
        });
      } else {
        res.json(eveDetails);
      }
    });
});
module.exports = router;