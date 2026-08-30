// middleware/session.js
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

module.exports = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,   // reuse your existing Atlas connection string
    ttl: 900,                       // 15 min, matches your current maxAge
  }),
  cookie: {
    maxAge: 900000,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  },
});