const Users = require("../../models/users");

/**
 * API returns all the users of the system
 * Every User which have deletedAt != NULL is the blocked user
 */
exports.allUsers = (req, res) => {
  Users.find()
    .lean()
    .sort({ createdAt: -1 })
    .select("firstName lastName email createdAt deletedAt")
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
exports.searchUser = (req, res) => {
  let { queryString } = req.body;
  Users.findOne({
    $or: [
      { email: queryString },
      { firstName: queryString },
      { lastName: queryString }
    ]
  })
    .lean()
    .select("firstName lastName email createdAt deletedAt")
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
exports.recentUsersJoined = (req, res) => {
  let userLimit = req.body.limit || 10;
  Users.find()
    .lean()
    .sort({ createdAt: -1 })
    .limit(userLimit)
    .select("firstName lastName email createdAt deletedAt")
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

