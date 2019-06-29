module.exports = app => {
  const contactUsControllers = require("../../controllers/admin/contactUsController");

  app.route("/api/contactUs").post(contactUsControllers.contactUs);
  app
    .route("/api/fetchAllContactUsQueries")
    .get(contactUsControllers.fetchAllContactUsQueries);
  app
    .route("/api/fetchSingleContactUsQuery")
    .get(contactUsControllers.fetchSingleContactUsQuery);
};
