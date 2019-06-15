const Users = require("../models/users");
const Vlogs = require("../models/vlogs");
const Products = require("../models/products");
const Blogs = require("../models/blogs");

exports.search = async (req, res) => {
  let { queryString } = req.body;
  const regex = new RegExp(escapeRegex(queryString), "gi");

  let users = [];
  let products = [];
  let blogs = [];
  let vlogs = [];

  await Users.find({
    deletedAt: null,
    $or: [{ firstName: regex }, { lastName: regex }]
  })
    .select("firstName lastName email displayPicture")
    .lean()
    .then(foundUsers => (users = foundUsers))
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );

  await Blogs.find({
    deletedAt: null,
    $or: [{ title: regex }, { content: regex }]
  })
    .select("title description content likes comments")
    .lean()
    .then(foundBlogs => (blogs = foundBlogs))
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );

  await Vlogs.find({
    deletedAt: null,
    $or: [{ title: regex }, { description: regex }]
  })
    .select("title description videoLink likes comments")
    .lean()
    .then(foundVlogs => (vlogs = foundVlogs))
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );

  await Products.find({
    deletedAt: null,
    $or: [{ productName: regex }, { description: regex }]
  })
    .select("productName description price discount likes comments")
    .lean()
    .then(foundProducts => (products = foundProducts))
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );

  res.status(200).json({
    success: true,
    users: users,
    blogs: blogs,
    vlogs: vlogs,
    products: products,
    message: "Items Searched Successfully"
  });
};

escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
