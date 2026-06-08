
const bm = require("../models/book.js")
const um = require("../models/user.js")
const {validationResult} = require("express-validator")


//add book
exports.Getaddbook = (req,res)=>{
res.render("add-book",{error:"",body:""})
}
//create book
exports.createbook = async(req,res)=>{
     try{
    let results = validationResult(req)
if(!results.isEmpty()){
    console.log(results.array())
  return  res.status(400).json({error:results.array()[0].msg})
}
 //declaring files
   console.log(req.files)
   let cover = req.files.cover[0].filename
    let file = req.files.file[0].filename
 if (!cover || !file){
    console.log("no files")
    return res.status(400).json({error:"cover image and file are required"})
}
console.log("Done checking")
//storing the book  
let newbm = new bm({
 title : req.body.title,
  author : req.body.author,
  desc : req.body.desc,
  genre : req.body.genre,
  publisyear : 2002,
  coverurl : cover,
filename : file,
publisherId:req.session.user.id
})
await newbm.save()
//getting the user
console.log(`book created successfully`)
res.json({message:"book was added"})
    }catch(err){
        console.log(`error from createbook \n${err}`)
        res.status(500)
    }

}