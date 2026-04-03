const limit = require("express-rate-limit")

module.exports = limit.rateLimit({
  windowMs:15*60*1000,
  limit:100,
  standardHeaders:"draft-8",
  legacyHeaders:false,
  message:"limit reached"
})
