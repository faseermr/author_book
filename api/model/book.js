const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    name: {
      type: String,
      required: [true, "This is required field"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "This is required field"],
    },
  })
);

module.exports = Book;
