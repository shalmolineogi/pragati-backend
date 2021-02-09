const express = require("express");
const schedule = require("../models/schedule");
const router = express.Router();
const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Types;
mongoose.Promise = global.Promise;

router.get("/all", (req, res) => {
    console.log("Getting all schedules");
    schedule.find({}).exec((err, schedules) => {
        if (err) {
            console.log(err);
        } else {
            res.json(schedules);
        }
    });
});

router.post("/create", (req, res) => {
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

module.exports = router;