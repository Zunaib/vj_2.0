module.exports = app => {
  const authControllers = require("../../controllers/app/authControllers");

  app.route("/api/signup").post(authControllers.signup);
  app.route("/api/confirmation/:token").get(authControllers.confirmation);
  app.route("/api/login").post(authControllers.login);
  app.route("/api/logout").get(authControllers.logout);
  
};
