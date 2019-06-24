module.exports = app => {
    const profileControllers = require("../../controllers/app/profileControllers");

    app.route("/api/followUser").get(profileControllers.followUser);
    app.route("/api/unFollowUser").get(profileControllers.unFollowUser);
    app.route("/api/getUserStats").post(profileControllers.getUserStats);
    

};
