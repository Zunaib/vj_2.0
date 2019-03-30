module.exports = app => {
    const contactUsControllers = require("../controllers/contactUsController");

    app.route("/api/contactUs").post(contactUsControllers.contactUs);

};
