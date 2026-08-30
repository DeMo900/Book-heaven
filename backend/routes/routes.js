// Express router setup
const express = require("express");
const router = express.Router();
const middlewares = require("../middleware");
const { body } = require("express-validator");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2").Strategy;
// Controllers
const books = require("../controllers/books.js");
const addbook = require("../controllers/add-books.js");
const {
  Postsignup,
  Postsignin,
  Postforgotpassword,
  Putupdate,
  Getupdate,
} = require("../controllers/auth");
const { page, fail, sucsess } = require("../controllers/oauth2.js");
const profile = require("../controllers/profile.js");

// =====================================
// Route Definitions
// =====================================

// Book routes
router.get("/books", middlewares.check, books.Getbooks);
router.get("/book/:title", middlewares.check, books.getBookByTitle);

router.post("/books/search", middlewares.check, books.searchbook);
router.put("/books", books.star);
//add book
router.get("/trend-book", books.GetTrendBook);
router.post(
  "/books/add-book",
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 4, max: 80 })
    .withMessage("you should type atleast 4 letters in title"),
  body("author")
    .isLength({ max: 50 })
    .notEmpty()
    .withMessage("author name is required"),
  body("desc")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 25, max: 500 })
    .withMessage("you should type at least 25 letters in description"),
  body("genre")
    .notEmpty()
    .isIn([
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
      "Poetry",
    ])
    .isLength({ min: 6, max: 16 })
    .withMessage("please pick a genre"),
  addbook.createbook,
);
// Authentication routes
router.get("/update-password", Getupdate);
router.post("/signup", Postsignup);
router.post("/login", Postsignin);
router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("email isn't valid"),
  Postforgotpassword,
);
router.put(
  "/update-password",
  body("password")
    .isStrongPassword()
    .withMessage("password isn't strong enough"),
  Putupdate,
);
// Google OAuth2 routes
router.get("/auth/google", page); // Prompt user for consent
router.get("/auth/google/callback", fail, sucsess); // OAuth callback
// User profile route
router.get("/profile", middlewares.check, profile.Getprofile);
module.exports = router;
