const express = require("express");
const cors = require("cors");
const dbConn = require("./api/config/database");
const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());

const port = 5000;

const authorRoutes = require("./api/router/author");
const bookRoutes = require("./api/router/book");

app.use("/api/author", authorRoutes);
app.use("/api/book", bookRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
