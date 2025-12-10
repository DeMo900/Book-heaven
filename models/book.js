////
const mongodb = require("mongoose");

const book = new mongodb.Schema({
  title : {type:String , minlength:4, maxlength:80, required:true},
  author :{type:String , maxlength:25, required:true},
  desc:{type:String , maxlength:500, required:true},
  genre:{type:String , minlength :6 , maxlength:16, enum:["Fiction","Non-Fiction","Fantasy","Science Fiction","Romance","Thriller","Mystery","Biography","Self-Help","History","Poetry"], required:true},
  publisyear : {type : Number , maxlength:4, required:true }, 
  coverurl : {type:String , required:true},
  rating : {type : Number  ,default:0, max:5, },
  filename:{type : String , unique : true , required : true},
  createdAt : {type:Date , default:Date.now()},
});

const bm = mongodb.model("book", book);

module.exports = bm;
/*
title
author
desc
genre
publishyear
coverurl
rating
reviews
createdAt
[
  "Fiction",
  "Non-Fiction",
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Thriller",
  "Mystery",
  "Biography",
  "Self-Help",
  "History",
  "Poetry"
]
*/