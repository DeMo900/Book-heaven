//modules
const express = require("express");
const mongodb = require("mongoose");
const multer = require("multer");
const middlewares = require("./middleware");
const passport = require("passport");
const helmet = require("helmet");
const override = require("method-override");
const cors = require("cors");
//router
const homerouter = require("./routes/routes.js");
require("dotenv").config();
//app
const app = express();
//middlewares
app.use(cors({origin:"http://localhost:5173", credentials:true, methods: ["GET", "POST", "PUT", "DELETE"]}))
app.options("*", cors()) 
app.use(middlewares.limit)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(middlewares.session)
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet({crossOriginResourcePolicy: { policy: "cross-origin" }}))
app.use(express.static("assets"));
app.use(multer({storage:middlewares.storage, fileFilter:middlewares.filter}).fields([{name:"cover", maxCount:1}, {name:"file", maxCount:1}]));
app.use(override("_method"));
app.set("view engine", "ejs");
app.use(homerouter);
//database connection
mongodb
  .connect(
    process.env.DB_URL,
  ) .then(() => {
    console.log(`conected to db`);
  })
  .catch((err) => {
    console.log(`error from mongodb ${err}`);
  });
app.listen(9000, (err) => {
  err ? console.log(err) : console.log(`conected`);
});

