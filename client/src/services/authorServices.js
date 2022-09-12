import http from "./http-common";

// add book
const create = (data) => {
  return http.post("/author", data);
};

const getAllAuthors = () => {
  return http.get("/author");
};

export default {
  create,
  getAllAuthors,
};
