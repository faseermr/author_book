import http from "./http-common";

// add book
const create = (data) => {
  return http.post("/book", data);
};

const getAllBooks = () => {
  return http.get("/book");
};

export default {
  create,
  getAllBooks,
};
