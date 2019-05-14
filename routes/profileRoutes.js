module.exports = app => {
    const profileControllers = require("../controllers/profileControllers");

    app.route("/api/followUser").post(profileControllers.followUser);
    app.route("/api/unFollowUser").post(profileControllers.unFollowUser);
    app.route("/api/getUserStats").post(profileControllers.getUserStats);
    

};
