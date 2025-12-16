//requiring
const um = require("../models/user")
const tm = require("../models/token")
const bcrypt = require("bcrypt")
const validate = require("../validation/user")
const { body,validationResult } = require("express-validator")
const mail = require("nodemailer")
const crypto = require("crypto")
const emitter = require("../emiter.js")
 require("../emiter.js")
//GET signup
exports.Getsignup = (req,res)=>{
res.render("signup")
}
//Get signin
exports.Getsignin = (req,res)=>{
res.render("signin",{error:undefined,body:undefined})
}
//POST signup
exports.Postsignup = async(req,res)=>{
//validate data
const {error} = validate(req.body,"signup")
if(error){
    return res.status(400).render("signup",{error:error.details[0].message,body:req.body})
}
//check if user already exists
try{
let user = await um.findOne({email:req.body.email})//finding
if(user){
    return res.status(400).render("signup",{error:"User with this email already exists",body:req.body})
}
//hasing the password
let hashedpassword = await bcrypt.hash(req.body.password,11)
req.body.password = hashedpassword
//storing the user
const nuser =  new um(req.body)
await nuser.save()//saving
return res.redirect("/signin")//redirecting
//loging the error and redirecting to the error page
}catch(err){
    console.log(err)
    return res.status(500).render("500")
}
}
//POST signin
exports.Postsignin = async(req,res)=>{
//validation
const {error} = validate({email:req.body.email,password:req.body.password},"signin")
if(error){
    console.log(error)
    return res.status(400).render("signin",{error:error.details[0].message,body:req.body})
}
//chcking if user exists
try{
    let user = await um.findOne({email : req.body.email})
    if (!user){
        console.log("user doesn't exist")
        return res.status(400).render("signin",{error:`user doesn't exist, signup first`,body:req.body})
    }
    //checking if password is correct
    let compare = await bcrypt.compare(req.body.password,user.password)
    if(!compare){
        console.log("password doesn't match")
      return  res.status(400).render("signin",{error:"wrong password!",body:req.body})
    }
    //sending welcome mail
    emitter.emit("loggedIn",req.body.email,user.username)
    //creating session 
    req.session.user = {email:req.body.email,
        id:user._id
    }
    //redirecting
return res.redirect("/")
}catch(error){
    console.log (error)
    return res.status(500).render(500)
}
}
//Getforgotpassword
exports.forgotpassword = (req,res)=>{
res.render("forgot-password")
}
//forgotpassword
exports.Postforgotpassword = async (req,res)=>{
//validating the input
try{
const results= validationResult(req)
if(!results.isEmpty()){
 return console.log(results.errors[0].msg)
}
let found = await um.findOne({email:req.body.email})
if(!found){
  return  console.log("email doesn't exist signup")
}
//generating code
let code = crypto.randomBytes(16).toString("hex") 
//checking if another token fron the sane user already exists and deleting it
let existingtoken = await tm.findOne({email:req.body.email})
if(existingtoken){
    await tm.deleteOne({email:req.body.email})
}
//storing the code
const newtoken = new tm ({
    email:req.body.email,
    token:code
})
await newtoken.save()
//sending the email
let transport = mail.createTransport({//creating transport
    service:"gmail",
    auth:{
        user:"proplayer524522@gmail.com",
        pass:process.env.APPCODE
    }
})
//sending
await transport.sendMail({
  to: req.body.email,
  subject: "Here is your url to reset your password", 
  text: `http://localhost:9000/update-password?code=${code}`, 
})
return res.render("signin",{error:"check your email to reset your password",body:{}})
}catch(err){//handling errors
    console.log(err)
    return res.render("500")
}
}
//Getupdate
exports.Getupdate = async (req,res)=>{
const token = await tm.findOne({token:req.query.code})

if(!token){
return res.send("error invalid code")
}
console.log(token.email)
res.render("update-password",{error:"",email:token.email})//sending the email to the front end
}
//updating password
exports.Putupdate = async(req,res)=>{
    console.log("sent")
const {email} = req.body
console.log(email)
try{
//validating password
const results = validationResult(req)
if(!results.isEmpty()){
    return res.status(400).render("update-password",{error:results.errors[0].msg, email:email})
}
//hashing the new passwordz
let hashedpassword = await bcrypt.hash(req.body.password,11)
//getting the user
let user = await um.findOne({email:email})
user.password = hashedpassword
await user.save()
//deleting the token
await tm.deleteOne({email:email})
//
return res.redirect("/signin")//redirecting to signin
}catch(error){
    console.log(`error while updating password ${error}`)
    return res.status(500).render("500")
}
}

//logout
exports.logout=async(req,res)=>{
    try{
   await req.session.destroy()
   res.clearCookie("connect.sid")
    return res.render("signin",{error:"sucsessfully logged you out!",body:{}})
    }catch(error){
        console.log(`error while destroying`)
        return res.status(500).render("500")
    }
}