const {createClient} = require("redis")
const redisClient = createClient()
redisClient.connect().then(()=>{
  console.log(`conected to redis`)
}) .catch(err=>{
   console.log(`error from redis ${err}`)
})

module.exports = redisClient
    