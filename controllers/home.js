const bm = require("/home/adam/coding/Books-collecction/models/book.js")
const um = require("/home/adam/coding/Books-collecction/models/user.js")
//home 
let Gethome = (req,res)=>{
  
    res.render("home")
}
module.exports = {Gethome}

//about
let Getabout = (req,res)=>{
    res.render("about")
}
module.exports = {Gethome,Getabout}
/*
/	Homepage (show top or newest books)	
/books	Show all books (with search + filter)	
/books/:id	Show single book details	
/add-book	Add a new book (form + POST)	
/books/:id/review	Add a review	
/login, /signup	Auth routes
*/