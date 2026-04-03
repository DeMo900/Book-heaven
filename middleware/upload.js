const multer = require("multer")

exports.storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,__dirname+"/../assets/uploads")
  },
  filename:(req,file,cb)=>{
    let name = Date.now()+"-"+file.originalname
    cb(null,name)
  }
})

exports.filter = (req,file,cb)=>{
  if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "application/pdf"){
    cb(null,true)
  }else{
cb(null,false)
  }
}
