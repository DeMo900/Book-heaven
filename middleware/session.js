const RedisStore = require("connect-redis")
const session = require("express-session")
require("dotenv").config();
const redisclient = require("../lib/redis/redis")
let redisstore = new RedisStore.RedisStore({client:redisclient})
module.exports = session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:false,
    cookie: { maxAge: 900000 },
store:redisstore
})
