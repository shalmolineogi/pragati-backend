require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Users = require("./Server/routes/users");
const Schedule = require("./Server/routes/schedule");
const Gallery = require("./Server/routes/gallery");
const Events = require("./Server/routes/events");
const api = require("./Server/routes/api");
const mongoose = require("mongoose");
const Registration = require("./Server/routes/registration");

const port = 3000;
const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/TechFest",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else console.log("DB Connected");
  }
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
// app.use('/api', api);
app.use("/api/schedule", Schedule);
app.use("/api/gallery", Gallery);
app.use("/api/events", Events);
app.use("/api/users", Users);
app.use("/api/registration", Registration);

app.get("/", (req, res) => {
  res.send("Hey, Its my first web server");
  const v = process.env.JWT_PRIVATE_KEY;

  console.log(v);
});

app.listen(3000, () => {
  console.log(`Listening from server running at port ${port}`);
});
