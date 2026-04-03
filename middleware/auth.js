const passport = require("passport")
const google = require("passport-google-oauth20").Strategy;
const um = require("../models/user.js")
require("dotenv").config();

//authentication middleware
exports.check = (req,res,next)=>{
    if(!req.session.user){
        return  res.status(401).render("signin",{body:{},error:undefined});
    }
    next()
}

//passport configuration
exports.googestrategy = passport.use(new google({
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
