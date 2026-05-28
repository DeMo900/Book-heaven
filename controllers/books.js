// ...existing code...
const bm = require("../models/book.js")
const um = require("../models/user.js")
//getting books
 exports.Getbooks = async(req,res)=>{
  try{
    const user = await um.findOne({_id:req.session.user.id})
    let populatedbooks = await user.populate("staredbooks")
    let staredBooksArray = populatedbooks.staredbooks
    //checking if genre exists
    if(req.query.genre){
      //getting and rendering the filtered books with the picked genre
    const filterdata = await bm.find({genre:req.query.genre})
        return res.json({books:filterdata,staredBooksArray})
    }
    //if not get and render all boks 
      const books = await bm.find()
       return res.json({books,staredBooksArray})
  }catch(err){
    console.log(`error from Getbooks \n${err}`)
    res.status(500).redirect("/500")
  }
}
exports.GetTrendBook = async(req,res)=>{
  try{
    //getting the trend book
 const book = await bm.find().sort({title:-1}) 
 console.log(book[0])
 //sending the book
 return res.status(200).json({
  book:book[0]
 })
  }catch(err){
    res.json({
      err
    })
    return console.log(`error from getting the trend book ${err}`)
  }
}
//searching
exports.searchbook = async(req,res)=>{
 
  try{
    //getting user 
      const user = await um.findOne({_id:req.session.user.id})
      //populating
     let populatedbooks = await user.populate("staredbooks")
        let staredBooksArray = populatedbooks.staredbooks
//find a booke that matches the title or genre
let books = await bm.find({$or:[{title:{$regex:req.query.value,$options:"i" }},
  {genre:{$regex:req.query.value,$options:"i" }}]})
//returning the data in json
return res.json({
  books,
  staredBooksArray
})
//catching errors
  }catch(err){  
console.log(`error from Postbook \n${err}`)
res.status(500).redirect("/500")
  } 
}
//staring a book 
exports.star = async(req,res)=>{
  try{
    //queries
    let {title,stared} = req.query
    //getting user
   let user = await um.findOne({email:req.session.user.email})
    //geting book
let book = await bm.findOne({title:title})
//stared
if(stared === "true"){
 book.rating +=1
await book.save()
user.staredbooks.push(book._id)
await user.save()
return res.status(200).json({ success: true })
}
  await bm.updateOne({title:title},{$inc:{rating:-1}})
 user.staredbooks.pull(book._id)
await user.save()
return res.status(200).json({ success: true })
  }catch(err){
    console.log(`error while staring ${err}`)
    return res.status(500).render("500")
  }
}