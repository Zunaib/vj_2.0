module.exports = app => {
    const userSettingsControllers = require("../controllers/userSettingsControllers");


    app.route("/api/changeGeneralBio").get(userSettingsControllers.changeGeneralBio);
  };
  