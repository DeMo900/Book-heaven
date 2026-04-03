const {createClient} = require("redis")
const RedisStore = require("connect-redis")
const session = require("express-session")
require("dotenv").config();

const redisclient = createClient()
redisclient.connect().then(()=>{
  console.log(`conected to redis`)
}) .catch(err=>{
   console.log(`error from redis ${err}`)
})

let redisstore = new RedisStore.RedisStore({client:redisclient})

module.exports = session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:false,
    cookie: { maxAge: 900000 },
store:redisstore
})
