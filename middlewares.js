//requiring modules
const session = require("express-session")
const store = require("connect-mongo")
const multer = require("multer")
const passport = require("passport")
const google = require("passport-google-oauth20").Strategy;
const um = require("./models/user.js")
const limit = require("express-rate-limit")
require("dotenv").config();
//sesion creation
exports.session = session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:false,
    cookie: { maxAge: 900000 },
store:store.create({mongoUrl:process.env.DB_URL,ttl:60*15})
})
//authentication middleware
exports.check = (req,res,next)=>{
    if(!req.session.user){
        return  res.status(401).render("signin",{body:{},error:undefined});
    }
    next()
}
//multer
exports.storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,__dirname+"/assets/uploads")
  },
  filename:(req,file,cb)=>{
    let name = Date.now()+"-"+file.originalname
    cb(null,name)
  }
})
exports.filter = (req,file,cb)=>{
  if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "application/pdf"){
    cb(null,true)
  }else{
cb(null,false)
  }
}
//passport configuration
exports.googestrategy=passport.use(new google({
clientID:process.env.CLIENT_ID,
clientSecret:process.env.CLIENT_SECRET,
callbackURL:"http://localhost:9000/auth/google/callback"
},async(accessToken,refreshToken,profile,done)=>{
  let {id,displayName,emails} = profile;
  //fetching 
  let getting =await um.findOne({googleId:id})
  let email = emails[0].value;
    let gettingemail = await um.findOne({email:email})
  if(getting ){

    return done(null,getting)
} 
if(gettingemail){
return done(null,gettingemail)
}
let newu = new um({
  googleId:id,
  username:displayName,
  email:email
})
await newu.save()
return done(null,newu)
}
))

exports.serial = passport.serializeUser((user, done) => {
  done(null, user.id);
});
 exports.deserial = passport.deserializeUser((id, done) => {
  done(null, id);
});
exports.limit = limit.rateLimit({
  windowMs:15*60*1000,
  limit:100,
  standardHeaders:"draft-8",
  legacyHeaders:false,
  message:"limit reached"
})