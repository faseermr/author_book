const express = require("express");
const router = express.Router();
const { create, findAll } = require("../controller/author");

router.post("/", create);

router.get("/", findAll);

module.exports = router;
