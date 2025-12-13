const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2").Strategy;
const um = require("/home/adam/coding/Books-collecction/models/user.js");
const emiter = require("../emiter")
//askingfor the required data
let page = passport.authenticate("google",{scope:["profile","email"]});


//callback route
let fail = passport.authenticate("google",{failureRedirect:"/login"})

let sucsess =async (req,res)=>{
    //successful authentication
    const user =await um.findOne({email:req.user.email})
    req.session.user = {
        id:user._id,
        email:req.user.email,
        username:req.user.username
    }
    emiter.emit("loggedIn",req.user.email,req.user.username)
    res.redirect("/");
}
module.exports = {page,fail,sucsess};