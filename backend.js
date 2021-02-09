require("dotenv").config();

const KEY = process.env.JWT_PRIVATE_KEY;
module.exports = KEY;
