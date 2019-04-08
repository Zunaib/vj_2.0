module.exports = app => {
  const useAsControllers = require("../controllers/useAsControllers");

  app.route("/api/useAsCustomer").get(useAsControllers.useAsCustomer);
  app.route("/api/useAsDesigner").get(useAsControllers.useAsDesigner);
  app.route("/api/useAsBlogger").get(useAsControllers.useAsBlogger);
  app.route("/api/useAsVlogger").get(useAsControllers.useAsVlogger);
};
