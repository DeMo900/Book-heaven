//requiring 
const mongodb = require("mongoose")
//creating the schema
const user = new mongodb.Schema({
 googleId:{type:String},
username:{type : String , unique : true, minlength:3 , maxlength:25 , required:true , match : /^[A-Za-z0-9._\- ]+$/},
password:{type : String , minlength : 8 , maxlength : 80 , match : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,80}$/},
email : {type : String , unique : true , maxlength : 50 , required : true , match : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/},
role:{type : String , enum : [`creator`,`user`] , default : `user` , required : true },
createdAt:{type:Date , default:Date.now()},
books:[{type:mongodb.Schema.Types.ObjectId,ref:"book"}],
staredbooks:[{type:mongodb.Schema.Types.ObjectId,ref:"book"}]
})
//modeling 
const um = mongodb.model("user",user)
//exporting
module.exports = um
