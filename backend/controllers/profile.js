//requiring
const um = require("../models/user.js");
const bm = require("../models/book.js");

exports.Getprofile = async (req, res) => {
  try {
    //user data
    let data = await um.findById(req.session.user.id);

    const { email, username, createdAt, role } = data;
    const date = `${createdAt.getDay()}-${createdAt.getMonth()}-${createdAt.getFullYear()}`;
    //user's books
    const books = await bm.find({ publisherId: data._id });
    return res.status(200).json({ email, username, role });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
