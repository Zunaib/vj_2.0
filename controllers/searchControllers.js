const Users = require("../models/users");
const Vlogs = require("../models/vlogs");
const Products = require("../models/products");
const Blogs = require("../models/blogs");

exports.search = (req, res) => {
  let { queryString } = req.body;
  if (req.body.queryString) {
    const regex = new RegExp(escapeRegex(queryString), "gi");
    Users.find({
      deletedAt: null,
      $or: [{ firstName: regex }, { lastName: regex }]
    })
      .select("firstName lastName email displayPicture")
      .lean()
      .then(users =>
        res.status(200).json({
          success: true,
          users: users,
          message: "Users Searched Successfully"
        })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  } else {
    Users.find({ deletedAt: null })
      .select("firstName lastName email displayPicture")
      .lean()
      .then(users =>
        res.status(200).json({
          success: true,
          users: users,
          message: "Users Searched Successfully"
        })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  }
};

escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
