const db = require("../model/index");
const Author = db.author;

module.exports = {
  create: (req, res) => {
    // console.log(req.body);
    const newAuthor = new Author({
      name: req.body.name,
    });

    newAuthor.save((err, author) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json({ message: "Author Successfully Added", author });
    });
  },

  findAll: (req, res) => {
    Author.find()
      // .populate("author", "-__v")
      .then((author) => {
        // console.log(author);
        res.json(author);
      })
      .catch((err) => res.status(500).send({ message: err }));
  },
};
