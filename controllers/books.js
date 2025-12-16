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
        let data = await bm.find()
        res.render("books",{data:data})
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
  } 
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
console.log(req.query)
//stared
if(stared === "true"){
 book.rating +=1
await book.save()
console.log(book)
  //unstared
}else if(stared === "false"){
 book.rating -= 1
await book.save()
console.log(book)
}
  }catch(err){
    console.log(`error while staring ${err}`)
    return res.status(500).render("500")
  }
}