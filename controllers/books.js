// ...existing code...
const bm = require("/home/adam/coding/Books-collecction/models/book.js")
const um = require("/home/adam/coding/Books-collecction/models/user.js")
//getting books
 exports.Getbooks = async(req,res)=>{
  try{
    //checking if genre exists
    if(req.query.genre){
      //getting and rendering the filtered books with the picked genre
    let filterdata = await bm.find({genre:req.query.genre})
    console.log(filterdata)
   return res.render("books",{data:filterdata,query:""})
    }
    //if not get and render all boks 
      let books = await bm.find()

    //getting user
      let user = await um.findOne({_id:req.session.user.id})
     let populatedbooks = await user.populate("staredbooks")
        let staredbooks = populatedbooks.staredbooks
       return res.render("books",{data:books,staredbooks})
  }catch(err){
    console.log(`error from Getbooks \n${err}`)
    res.status(500).redirect("/500")
  }
}
//searching
exports.searchbook = async(req,res)=>{
 
  try{
//find a booke that matches the title or genre
let book = await bm.find({$or:[{title:{$regex:req.query.value,$options:"i" }},
  {genre:{$regex:req.query.value,$options:"i" }}]})

//returning the data in json
return res.json({
  book
})
//catching errors
  }catch(err){  
console.log(`error from Postbook \n${err}`)
res.status(500).redirect("/500")
  } x
}
//staring a book 
exports.star = async(req,res)=>{
  try{
    //queries
    let {title,stared} = req.query
    //getting user
   let user = await um.findOne({email:req.session.user.email})
    console.log(user)
    //geting book
let book = await bm.findOne({title:title})
//stared
if(stared === "true"){
 book.rating +=1
await book.save()
user.staredbooks.push(book._id)
await user.save()
  //unstared
}else if(stared === "false"){
 book.rating -= 1
await book.save()
user.staredbooks.pull(book._id)
await user.save()
}
  }catch(err){
    console.log(`error while staring ${err}`)
    return res.status(500).render("500")
  }
}