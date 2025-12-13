
const bm = require("/home/adam/coding/Books-collecction/models/book.js")
const um = require("/home/adam/coding/Books-collecction/models/user.js")
const {validationResult} = require("express-validator")


//add book
exports.Getaddbook = (req,res)=>{
res.render("add-book",{error:"",body:""})
}
//create book
exports.createbook = async(req,res)=>{
    //declaring files
    let cover = req.files.cover[0].filename
    let file = req.files.file[0].filename

    //validation
    try{
let results = validationResult(req)
console.log(req.file)
console.log(req.body)
if(!results.isEmpty()){
    console.log(results.array())
  return  res.render("add-book",{error:results.array(),body:req.body})
   // return res.status(422).render("add-book",{errors:results.array()})
}
 if (!cover){
    return res.render("add-book",{error:[{msg:"cover image is required"}],body:req.body})
}
//storing the book  
let newbm = new bm({
 title : req.body.title,
  author : req.body.author,
  desc : req.body.desc,
  genre : req.body.genre,
  publisyear :  req.body.publisyear,
  coverurl : cover,
filename : file
})
await newbm.save()
//getting the user
let user = await um.findById(req.session.user.id)
user.books.push(newbm._id)
await user.save()
console.log(`book created successfully`)
    }catch(err){
        console.log(`error from createbook \n${err}`)
        res.status(500).redirect("/500")
    }

}