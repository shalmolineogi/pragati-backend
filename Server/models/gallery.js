const mongoose = require('mongoose');
const schema = mongoose.Schema;
const gallerySchema = new schema({
    picurl: {
        type: String,
        // maxlength: 30,
        required: true,
    },
    // venue: {
    //     type: String,
    //     maxlength: 30,
    //     required: true,
    // },
    // date: {
    //     type: String,
    //     maxlength: 10,
    //     required: true,
    // },

    // starttime: {
    //     type: String,
    //     maxlength: 10,
    //     required: true,
    // },
    // endtime: {
    //     type: String,
    //     maxlength: 10,
    //     required: true,
    // }


});

module.exports = mongoose.model("Gallery", gallerySchema, 'gallery');