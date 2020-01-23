module.exports = app => {
  const useAsControllers = require("../../controllers/app/useAsControllers");

  app.route("/api/useAsCustomer").get(useAsControllers.useAsCustomer);
  app.route("/api/useAsCreator").get(useAsControllers.useAsCreator);
  app.route("/api/fetchUserTypeFlags").get(useAsControllers.fetchUserTypeFlags);
  
};
