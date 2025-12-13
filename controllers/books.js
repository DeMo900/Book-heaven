// ...existing code...
const bm = require("/home/adam/coding/Books-collecction/models/book.js")

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
