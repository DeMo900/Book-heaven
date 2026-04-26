//requiring
const um = require("../models/user")
const tm = require("../models/token")
const bcrypt = require("bcrypt")
const validate = require("../validation/user")
const { body,validationResult } = require("express-validator")
const mail = require("nodemailer")
const crypto = require("crypto")
const emitter = require("../emiter.js")
const redis = require("../lib/redis/redis")
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
    console.log("requesteed")
//validate data
const {username,email,password} = req.body
const {error} = validate(req.body,"signup")
if(error){
    return res.status(400).json({error:error.details[0].message})
}
//check if user already exists
try{
const user = await um.findOne({email})//finding
if(user){
    return res.status(400).json({error:"User with this email already exists"})
}
//hasing the password
const hashedpassword = await bcrypt.hash(password,11)
//storing the user
await um.create({username,email,password:hashedpassword})//saving
return res.redirect("/signin")//redirecting
//loging the error and redirecting to the error page
}catch(err){
    console.log(err)
    return res.status(500).json({error:"Internal server error"})
}
}
//POST signin
exports.Postsignin = async(req,res)=>{
//validation
const {email,password} = req.body
if(!email || !password){
    return res.status(400).json({error:"Please fill in all the fields"})
}
//chcking if user exists
try{
    const user = await um.findOne({email : email})
    if (!user){
        console.log("no user was found")
        return res.status(400).json({error:`Invalid email/password`})
    }
    //checking if password is correct
    const IsPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
    if(!IsPasswordCorrect){
        console.log("incorrect password")
      return  res.status(400).json({error:"Invalid email/password"})
    }
    //sending welcome mail
    emitter.emit("loggedIn",req.body.email,user.username)
    //creating session 
 req.session.user = {email:req.body.email,
        id:user._id
    }
console.log("logged in")
    return res.json({message:"logged in"})
   
}catch(error){
    console.log (error)
    return res.status(500).json({error:"Internal server error"})
}
}
//Getforgotpassword
exports.forgotpassword = (req,res)=>{
res.render("forgot-password")
}
//forgotpassword
exports.Postforgotpassword = async (req,res)=>{
//validating the input
const {email} = req.body
try{
const results= validationResult(req)
if(!results.isEmpty()){
 return res.json({error:results.errors[0].msg})
}
let isFound = await um.findOne({email})
if(!isFound){
  return  res.json({error:"email doesn't exist signup"})
}
//generating code
let code = crypto.randomBytes(16).toString("hex") 
//checking if another token fron the sane user already exists and deleting it
let deletingExistingToken = await redis.del(`token:${email}`)
if(deletingExistingToken === 1){
    console.log("deleted existing token")
}
//storing the code
await redis.set(`token:${email}`,code)
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
  text: `http://localhost:5173/update-password?code=${code}`, 
})
return res.json({message:"check your email to reset your password"})
}catch(err){//handling errors
    console.log(err)
    return res.json({error:"Internal server error"})
}
}
//Getupdate
exports.Getupdate = async (req,res)=>{
const token = await tm.findOne({token:req.query.code})
if(!token){
return res.json({error:"invalid code"})
}
res.json({email:token.email})//sending the email to the front end
}
//updating password
exports.Putupdate = async(req,res)=>{
    console.log("sent")
const {email} = req.body
console.log(email)
console.log(req.body.password)
try{
//validating password
const results = validationResult(req)
if(!results.isEmpty()){
    return res.status(400).json({error:results.errors[0].msg})
}
//hashing the new passwordz
let hashedpassword = await bcrypt.hash(req.body.password,11)
//getting the user
await um.updateOne({email},{$set:{password:hashedpassword}})
//deleting the token
await tm.deleteOne({email})
//
return res.json({message:"password updated successfully"})//redirecting to signin
}catch(error){
    console.log(`error while updating password ${error}`)
    return res.status(500).json({error:"Internal server error"})
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