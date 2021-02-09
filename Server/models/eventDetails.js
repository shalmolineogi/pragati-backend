const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {
    ObjectId
} = mongoose.Schema;
const eventType = require("./eventType")
const eventsDetailSchema = new schema({
    evename: {
        type: String,
        maxlength: 30,
        required: true,
    },
    desc: {
        type: String,
        maxlength: 30,
        required: true,
    },
    ref: {
        type: ObjectId,
        maxlength: 30,
        required: true,
    }


});

module.exports = mongoose.model("EventsDetail", eventsDetailSchema, 'eventDetails');