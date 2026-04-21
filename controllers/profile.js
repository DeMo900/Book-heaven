//requiring 
const um = require("../models/user.js")
const bm = require("../models/book.js")

exports.Getprofile = async(req,res)=>{
 try{
    //user data
    let data = await um.findById(req.session.user.id)
    console.log(data)
    const {email,username,createdAt} = data
    const date = `${createdAt.getDay()}-${createdAt.getMonth()}-${createdAt.getFullYear()}`
    //user's books
    const books = await bm.find({publisherId:data._id})
    return  res.render("profile",{books:books, email, username,date})    
 }  catch(err){
    console.log(`error from getprofile \n${err}`)
    res.status(500).redirect("/500")
 } 
}