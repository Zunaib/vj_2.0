module.exports = app => {
  const userSettingsControllers = require("../../controllers/app/userSettingsControllers");


  app.route("/api/changeSettings").post(userSettingsControllers.changeSettings);
  app.route("/api/changePassword").post(userSettingsControllers.changePassword);
  app.route("/api/changeDisplayPicture").put(userSettingsControllers.changeDisplayPicture);
  app.route("/api/fetchDisplayPicture").get(userSettingsControllers.fetchDisplayPicture);
  app.route("/api/deleteDisplayPicture").delete(userSettingsControllers.deleteDisplayPicture);
  
  app.route("/api/fetchUserSettings").get(userSettingsControllers.fetchUserSettings);
  app.route("/api/fetchGeneralBioDesigner").get(userSettingsControllers.fetchGeneralBioDesigner);
  app.route("/api/fetchGeneralBioBlogger").get(userSettingsControllers.fetchGeneralBioBlogger);
  app.route("/api/fetchGeneralBioVlogger").get(userSettingsControllers.fetchGeneralBioVlogger);

  app.route("/api/changeDesignerSettings").put(userSettingsControllers.changeDesignerSettings);
  app.route("/api/changeBloggerSettings").put(userSettingsControllers.changeBloggerSettings);
  app.route("/api/changeVloggerSettings").put(userSettingsControllers.changeVloggerSettings);

};
