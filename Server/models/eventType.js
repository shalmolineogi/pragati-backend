const mongoose = require('mongoose');
const schema = mongoose.Schema;
const eventsSchema = new schema({
    name: {
        type: String,
        maxlength: 30,
        required: true,
    }


});

module.exports = mongoose.model("Events", eventsSchema, 'events');