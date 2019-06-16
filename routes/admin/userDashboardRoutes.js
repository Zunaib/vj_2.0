module.exports = app => {
    const userDashboardControllers = require("../../controllers/admin/userDashboardControllers");

    app.route("/api/admin/fetchAllUsers").get(userDashboardControllers.fetchAllUsers);

};
