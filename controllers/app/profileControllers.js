const DesignerOrders = require("../../models/designerOrders");
const Users = require("../../models/users");
const Products = require("../../models/products");
const Blogs = require("../../models/blogs");
const Vlogs = require("../../models/vlogs");

exports.followUser = (req, res) => {
  const { userId } = req.query;

  Users.findByIdAndUpdate(req.user.id, { $push: { followings: userId } })
    .then(user => console.log("Successfully Following"))
    .catch(err => console.log(err));

  Users.findByIdAndUpdate(userId, { $push: { followers: req.user.id } })
    .then(user => console.log("New Follower"))
    .catch(err => console.log(err));
};

exports.unFollowUser = (req, res) => {
  const { userId } = req.query;

  Users.findByIdAndUpdate(req.user.id, { $pull: { followings: userId } })
    .then(user => console.log("Successfully Unfollowed"))
    .catch(err => console.log(err));

  Users.findByIdAndUpdate(userId, { $pull: { followers: req.user.id } })
    .then(user => console.log("Follower Left"))
    .catch(err => console.log(err));
};

exports.getUserStats = async (req, res) => {
  let totalProducts, totalBlogs, totalVlogs, totalFollowers;
  const { userId } = req.body;

  await Users.findById(userId).then(user => {
    totalFollowers = user.followers.length;
    userSince = new Date(user.createdAt).toDateString();
  });

  await Products.find({ userId: userId })
    .lean()
    .then(product => (totalProducts = product.length))
    .catch(err => console.log(err));

  await Blogs.find({ userId: userId })
    .lean()
    .then(blogs => (totalBlogs = blogs.length))
    .catch(err => console.log(err));

  await Vlogs.find({ userId: userId })
    .lean()
    .then(vlogs => (totalVlogs = vlogs.length))
    .catch(err => console.log(err));

  return res.status(200).json({
    success: true,
    totalFollowers: totalFollowers,
    totalProducts: totalProducts,
    totalBlogs: totalBlogs,
    totalVlogs: totalVlogs
  });
};
