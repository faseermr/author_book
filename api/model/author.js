const mongoose = require("mongoose");

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: {
      type: String,
      required: [true, "This is required field"],
    },
  })
);

module.exports = Author;
