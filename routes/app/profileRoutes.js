module.exports = app => {
    const profileControllers = require("../../controllers/app/profileControllers");
    const notificationControllers = require("../../controllers/app/notificationControllers");

    app.route("/api/followUser").get(profileControllers.followUser);
    // app.route("/api/unFollowUser").get(profileControllers.unFollowUser);
    app.route("/api/getUserStats").post(profileControllers.getUserStats);
    app.route("/api/fetchNotifications").get(notificationControllers.fetchNotifications);

};
