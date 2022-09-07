const db = require("../model/index");
const author = require("./author");
const Author = db.author;
const Book = db.book;

module.exports = {
  create: (req, res) => {
    //console.log(req.body);
    const newBook = new Book({
      name: req.body.name,
    });

    newBook.save((err, book) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Author.find(
        {
          name: { $in: req.body.author },
        },
        (err, author) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          book.author = author.map((val) => val._id);
          book.save((err, book) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.status(200).json({ message: "Book Successfully Added", book });
          });
        }
      );
    });
  },

  findAll: (req, res) => {
    Book.find()
      .populate("author", "-__v")
      .then((book) => {
        res.json(book);
      })
      .catch((err) => res.status(500).send({ message: err }));
  },

  deleteById: (req, res) => {
    let book_id = req.params.id;
    Book.deleteOne({ _id: book_id })
      .exec()
      .then((book) => res.json({ message: "Book Deleted Successfully" }));
  },

  update: (req, res) => {
    let book_id = req.params.id;
    console.log(req.params, req.body);
    Book.findByIdAndUpdate(book_id, req.body, { useFindAndModify: false }).then(
      (book) => {
        res.status(200).json({ message: "Book Successfully Updated", book });
      }
    );
  },
};
