const db = require("../model/index");
const author = require("./author");
const Author = db.author;
const Book = db.book;

module.exports = {
  // create: (req, res) => {
  //   // console.log("8 ", req.body);
  //   const newBook = new Book({
  //     name: req.body.name,
  //   });

  //   newBook.save((err, book) => {
  //     if (err) {
  //       //  console.log("error 123:", err);
  //       res.status(400).send({ message: err });
  //       return;
  //     }
  //     Author.find(
  //       {
  //         name: { $in: req.body.author },
  //       },
  //       (err, author) => {
  //         if (err) {
  //           res.status(500).send({ message: err });
  //           return;
  //         }
  //         book.author = author.map((val) => val._id);
  //         book.save((err, book) => {
  //           if (err) {
  //             res.status(500).send({ message: err });
  //             return;
  //           }
  //           res.status(200).json({ message: "Book Successfully Added", book });
  //         });
  //       }
  //     );
  //   });
  // },

  create: (req, res) => {
    Author.find(
      {
        name: { $in: req.body.author },
      },
      (err, author) => {
        console.log("author:", author.length);
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (author.length > 0) {
          let author_id = author.map((val) => val._id);

          let newBook = new Book({
            name: req.body.name,
            author: author_id,
          });

          newBook
            .save()
            .then((book) => res.status(200).json(book))
            .catch((err) => res.status(400).json(err));
        } else {
          res.status(400).json({ message: "Please check author" });
        }
      }
    );
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
    Author.find(
      {
        name: { $in: req.body.author },
      },
      (err, author) => {
        console.log(author);
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        const updateBook = {
          name: req.body.name,
        };

        updateBook.author = author.map((val) => val._id);
        Book.findByIdAndUpdate(book_id, updateBook, { useFindAndModify: false })
          .then((book) => {
            res
              .status(200)
              .json({ message: "Book Successfully Updated", book });
          })
          .catch((err) => res.status(500).send({ message: err }));
      }
    );
  },
};
