
const mongo  = require("mongoose")

const tokenSchema = new mongo.Schema({
    email:{type:String,required:true},
token:{type:String,required:true,unique:true},
createdAt:{type:Date,expires:900,default:Date.now}
})
const tm  = mongo.model("Token",tokenSchema)
module.exports = tm;