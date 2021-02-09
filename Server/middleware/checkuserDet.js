require("dotenv").config();
const express = require("express");
const Registration = require("../models/registration");
const Users = require("../models/user");
const UserReg = require("../models/userReg");
// const jwt = require("jsonwebtoken");
// const eventDetails = require("../models/eventDetails");
const router = express.Router();
const mongoose = require("mongoose");



module.exports = (req, res, next) => {
    // try {
    let usersReq = req.body.participants;
    // console.log(usersReq);

    // let count = 0;
    // let msg = ""
    let flag = true;
    let allUserEmail = []
    // let regEveList = []
    usersReq.forEach(user => {
        allUserEmail.push(user.email)
    });

    console.log("emails", allUserEmail)

    Users.find({
            email: {
                $in: allUserEmail
            }
        })
        .exec()
        .then(users => {
            console.log("users", users)
            if (users.length < allUserEmail.length) {
                return res.status(404).json({
                    messege: "Can't find user"
                });
            } else {
                users.forEach(el => {
                    el.registeredEvents.forEach(elem => {
                        if (elem == req.body.evename) {
                            flag = false;
                        }
                    })
                })
                // console.log(regEveList);
                if (!flag) {
                    return res.status(404).json({
                        messege: 'Some of users has already registered for the event'
                    });
                }
                console.log('hello');



                next();
            }
        })
        .catch(err => {
            console.log("error", err)
            return res.status(500).json({
                error: err
            });
        });

}