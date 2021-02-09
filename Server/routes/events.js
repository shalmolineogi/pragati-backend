const express = require("express");
const events = require("../models/eventType");
const eventDetails = require("../models/eventDetails");
const router = express.Router();
const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Types;
mongoose.Promise = global.Promise;

router.get("/eventTypes", (req, res) => {
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

router.get("/eventTypes/:eventid", (req, res) => {
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