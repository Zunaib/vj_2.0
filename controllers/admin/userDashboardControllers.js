const Users = require("../../models/users");

/**
 * API returns all the users of the system
 * Every User which have deletedAt != NULL is the blocked user
 */
exports.fetchAllUsers = (req, res) => {
  Users.find()
    .lean()
    .sort({ createdAt: -1 })
    // .select("firstName lastName email userName createdAt deletedAt dateofbirth gender")
    .then(users => {
      return res.status(200).json({
        success: true,
        users: users,
        message: "All Users fetched successfully"
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      });
    });
};

/**
 * The user can be searched using queryString variable
 *  API mathches it with email, firstName, lastName
 *
 */
exports.searchUsers = (req, res) => {
  let { queryString } = req.body;

  const regex = new RegExp(escapeRegex(queryString), "gi");

  Users.find({
    $or: [
      { firstName: regex },
      { lastName: regex },
      { email: regex },
      { userName: regex }
    ]
  })
    // .select("firstName lastName email displayPicture createdAt deletedAt")
    .sort({ createdAt: -1 })
    .lean()
    .then(users => {
      return res.status(200).json({
        success: true,
        users: users,
        message: "User fetched successfully"
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      });
    });
};

/**
 * API returns recent 10 users joined
 * IF limit is sent along with the request API returns that amount of users
 */
exports.fetchRecentUsersJoined = (req, res) => {
  let userLimit = parseInt(req.query.limit) || 10;
  Users.find()
    .lean()
    .sort({ createdAt: -1 })
    .limit(userLimit)
    // .select("firstName lastName email displayPicture createdAt deletedAt")
    .then(users => {
      return res.status(200).json({
        success: true,
        users: users,
        message: "Recent 10 users fetched successfully"
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      });
    });
};

exports.fetchBlockedUsers = (req, res) => {
  Users.find({ deletedAt: { $ne: null } })
    .lean()
    .sort({ createdAt: -1 })
    // .select("firstName lastName email displayPicture createdAt deletedAt")
    .then(users => {
      return res.status(200).json({
        success: true,
        users: users,
        message: "Blocked users fetched successfully"
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      });
    });
};

exports.blockUser = (req, res) => {
  Users.findById(req.query.userId)
    .then(user => {
      if (!user.deletedAt) {
        user.deletedAt = Date.now();
        user.save();
        res.status(200).json({
          success: true,
          user: user,
          message: "User Blocked Successfully"
        });
      } else {
        user.deletedAt = null;
        user.save();
        res.status(200).json({
          success: true,
          user: user,
          message: "User Unblocked Successfully"
        });
      }
    })
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};