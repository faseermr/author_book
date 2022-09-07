const express = require("express");
const router = express.Router();
const { create, findAll, deleteById, update } = require("../controller/book");

router.post("/", create);

router.get("/", findAll);

router.delete("/:id", deleteById);

router.put("/update/:id", update);

module.exports = router;
