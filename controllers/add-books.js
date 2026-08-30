const bm = require("../models/book.js");
const um = require("../models/user.js");
const { validationResult } = require("express-validator");

// Handler to create a new book
exports.createbook = async (req, res) => {
  try {
    let results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(400).json({ error: results.array()[0].msg });
    }
    // Extract uploaded file names

    let cover = req.files.cover[0].filename;
    let file = req.files.file[0].filename;
    if (!cover || !file) {
      return res
        .status(400)
        .json({ error: "cover image and file are required" });
    }

    // Create and save new book record
    let newbm = new bm({
      title: req.body.title,
      author: req.body.author,
      desc: req.body.desc,
      genre: req.body.genre,
      publisyear: 2002,
      coverurl: cover,
      filename: file,
      publisherId: req.session.user.id,
    });
    await newbm.save();
    // Return success response
    return res.status(200).json({ message: "book was added" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
