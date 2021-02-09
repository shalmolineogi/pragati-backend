const jwt = require("jsonwebtoken");
const KEY = require("../../backend");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, KEY);
        next();
        req.userData = decode;
    } catch (err) {
        return res.status(404).json({
            messege: "Auth failed"
        });
    }
};