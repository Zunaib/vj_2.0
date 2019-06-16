module.exports = app => {
    const authControllers = require("../../controllers/admin/authControllers");

    app.route("/api/admin/signup").post(authControllers.signup);
    app.route("/api/admin/login").post(authControllers.login);
    app.route("/api/admin/logout").get(authControllers.logout);

};
