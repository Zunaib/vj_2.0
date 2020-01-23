const DesignerOrders = require("../../models/designerOrders");
const Users = require("../../models/users");
const Products = require("../../models/products");
const Blogs = require("../../models/blogs");
const Vlogs = require("../../models/vlogs");

exports.followUser = (req, res) => {
  const { userId } = req.query;
  Users.findById(req.user.id)
    .select("firstName lastName followings")
    .then(loggedInUser => {
      if (loggedInUser.followings.indexOf(userId) > -1) {
        // return res.status(200).json({
        //   success: false,
        //   message: "User Already Followed"
        // });
        loggedInUser.followings.pull(userId);
        loggedInUser.save();
        Users.findByIdAndUpdate(
          userId,
          { $pull: { followers: req.user.id } },
          { new: true }
        )
          .select("firstName lastName followers")
          .then(currentProfileUser => res.status(200).json({
            success: true,
            currentProfileUser: currentProfileUser,
            loggedInUser: loggedInUser,
            message: "Successfully Unfollowed User"
          }))
          .catch(err =>
            res
              .status(400)
              .json({ success: false, message: "Something went wrong" })
          );
      } else {
        loggedInUser.followings.push(userId);
        loggedInUser.save();
        Users.findByIdAndUpdate(
          userId,
          { $push: { followers: req.user.id } },
          { new: true }
        )
          .select("firstName lastName followers")
          .then(currentProfileUser => res.status(200).json({
            success: true,
            currentProfileUser: currentProfileUser,
            loggedInUser: loggedInUser,
            message: "Successfully Followed User"
          }))
          .catch(err =>
            res
              .status(400)
              .json({ success: false, message: "Something went wrong" })
          );
      }
    });
};

// exports.unFollowUser = (req, res) => {
//   const { userId } = req.query;

//   Users.findByIdAndUpdate(req.user.id, { $pull: { followings: userId } })
//     .then(user => console.log("Successfully Unfollowed"))
//     .catch(err => console.log(err));

//   Users.findByIdAndUpdate(userId, { $pull: { followers: req.user.id } })
//     .then(user => console.log("Follower Left"))
//     .catch(err => console.log(err));
// };

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
