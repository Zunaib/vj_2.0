module.exports = app => {
  const userSettingsControllers = require("../controllers/userSettingsControllers");


  app.route("/api/changeSettings").post(userSettingsControllers.changeSettings);
  app.route("/api/fetchUserSettings").get(userSettingsControllers.fetchUserSettings);
  app.route("/api/changeGeneralBioDesigner").get(userSettingsControllers.changeGeneralBioDesigner);
  app.route("/api/changeGeneralBioBlogger").get(userSettingsControllers.changeGeneralBioBlogger);
  app.route("/api/changeGeneralBioVlogger").get(userSettingsControllers.changeGeneralBioVlogger);
  app.route("/api/fetchGeneralBioDesigner").get(userSettingsControllers.fetchGeneralBioDesigner);
  app.route("/api/fetchGeneralBioBlogger").get(userSettingsControllers.fetchGeneralBioBlogger);
  app.route("/api/fetchGeneralBioVlogger").get(userSettingsControllers.fetchGeneralBioVlogger);
};
