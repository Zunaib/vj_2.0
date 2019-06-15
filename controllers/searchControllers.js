const Users = require("../models/users");
const Vlogs = require("../models/vlogs");
const Products = require("../models/products");
const Blogs = require("../models/blogs");

exports.search = (req, res) => {
  let { queryString } = req.body;
  if (req.body.queryString) {
    const regex = new RegExp(escapeRegex(queryString), "gi");
    Users.find({ deletedAt: null, $or: [{ firstName: regex }, { lastName: regex }] })
      .then(users => console.log(users))
      .catch(err => console.log(err));
  } else {
    Users.find({ deletedAt: null })
      .then(users => console.log(users))
      .catch(err => console.log(err));
  }
};

escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
