module.exports = app => {
  const userDashboardControllers = require("../../controllers/admin/userDashboardControllers");

  app
    .route("/api/admin/fetchAllUsers")
    .get(userDashboardControllers.fetchAllUsers);
  app
    .route("/api/admin/searchUsers")
    .post(userDashboardControllers.searchUsers);
  app
    .route("/api/admin/fetchRecentUsersJoined")
    .get(userDashboardControllers.fetchRecentUsersJoined);
  app
    .route("/api/admin/fetchBlockedUsers")
    .get(userDashboardControllers.fetchBlockedUsers);
  app.route("/api/admin/blockUser").get(userDashboardControllers.blockUser);
};
