//requiring 
const um = require("/home/adam/coding/Books-collecction/models/user.js")


exports.Getprofile = async(req,res)=>{
 try{
    //user data
    let data = await um.findById(req.session.user.id)
    console.log(data)
    const {email,username,createdAt} = data
    const date = `${createdAt.getDay()}-${createdAt.getMonth()}-${createdAt.getFullYear()}`
    //user's books
    let books = await data.populate('books')
    const booksarray = books.books
    //looping on the array and getting the required data
  return  res.render("profile",{books:booksarray, email, username,date})    
 }  catch(err){
    console.log(`error from getprofile \n${err}`)
 } 
}