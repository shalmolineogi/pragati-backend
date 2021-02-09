const express = require("express");
const gallery = require("../models/gallery");
const router = express.Router();
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
mongoose.Promise = global.Promise;

router.get("/all", (req, res) => {
  console.log("Getting all photos");
  gallery.find({}).exec((err, photos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(photos);
    }
  });
});

router.post("/create", (req, res) => {
  console.log("Inserting new schedule");
  var newGallery = new gallery();
  newGallery.picurl = req.body.picurl;
  newGallery.save((err, insertedPhoto) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Error in Gallery photo Insertion",
      });
    } else {
      return res.json(insertedPhoto);
    }
  });
});

module.exports = router;
