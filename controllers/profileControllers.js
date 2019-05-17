const DesignerOrders = require("../models/designerOrders");
const Users = require("../models/users");
const Products = require("../models/products");
exports.followUser = (req, res) => {
  const { userId } = req.body;

  Users.findByIdAndUpdate(req.user.id, { $push: { followings: userId } })
    .then(user => console.log("Successfully Following"))
    .catch(err => console.log(err));

  Users.findByIdAndUpdate(userId, { $push: { followers: req.user.id } })
    .then(user => console.log("New Follower"))
    .catch(err => console.log(err));
};

exports.unFollowUser = (req, res) => {
  const { userId } = req.body;

  Users.findByIdAndUpdate(req.user.id, { $pull: { followings: userId } })
    .then(user => console.log("Successfully Unfollowed"))
    .catch(err => console.log(err));

  Users.findByIdAndUpdate(userId, { $pull: { followers: req.user.id } })
    .then(user => console.log("Follower Left"))
    .catch(err => console.log(err));
};

exports.getUserStats = async (req, res) => {
  let totalOrders, totalProducts, totalFollowers, userSince;
  const { userId } = req.body;

  await Users.findById(userId).then(user => {
    totalFollowers = user.followers.length;
    userSince = new Date(user.createdAt).toDateString();
  });

  await Products.find({ userId: userId })
    .then(product => (totalProducts = product.length))
    .catch(err => console.log(err));

  await DesignerOrders.find({ designer : userId})
    .then(orders => (totalOrders = orders.length))
    .catch(err => console.log(err));

  return res.status(200).json({
    success: true,
    totalOrders: totalOrders,
    totalFollowers: totalFollowers,
    totalProducts: totalProducts
  });
};

