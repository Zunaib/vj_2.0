module.exports = app => {
  const authControllers = require("../controllers/authControllers");

  app.route("/api/signup").post(authControllers.signup);

  
};
