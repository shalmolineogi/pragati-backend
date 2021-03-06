const mongoose = require('mongoose');
const User = require('./user');
const schema = mongoose.Schema;

const userRegSchema = new schema({
    _id: mongoose.Schema.Types.ObjectId,
    participantNo: {
        type: Number,
        maxlength: 8,
        required: true,
    },
    name: {
        type: String,
        maxlength: 30,
        required: true,
    },
    // lastname: {
    //     type: String,
    //     maxlength: 30,
    //     required: true,
    // },
    email: {
        type: String,
        // maxlength: 50,
        required: true,
        // unique: true,
        match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    },
    // password: {
    //     type: String,
    //     // maxlength: 100,
    //     required: true,
    //     // match: /^([a-zA-Z0-9@*#]{8,15})$/

    // },
    contact: {
        type: String,
        maxlength: 10,
        required: true,
        // unique: true,
    },
    clgname: {
        type: String,
        maxlength: 30,
        required: true,
    },
});
const registrationSchema = new schema({
    teamname: {
        type: String,
        maxlength: 30,
        required: true,
    },
    evename: {
        type: String,
        maxlength: 30,
        required: true,
    },
    eveId: {
        type: String,
        maxlength: 30,
        required: true,
    },

    // participants: [{
    //     name: {
    //         type: String,
    //         maxlength: 30,
    //         required: true,
    //     },
    //     email: {
    //         type: String,
    //         required: true,
    //         match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    //     },
    //     contact: {
    //         type: String,
    //         maxlength: 10,
    //         required: true,
    //         // unique: true,
    //     },
    //     clgname: {
    //         type: String,
    //         maxlength: 30,
    //         required: true,
    //     },

    // }],
    participants: [userRegSchema],
    payAmt: {
        type: Number,
        maxlength: 5,
        required: true
    },

    paymentStatus: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Registration", registrationSchema);