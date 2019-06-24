module.exports = app => {
  const vlogControllers = require("../../controllers/app/vlogControllers");

  app.route("/api/addVlog").post(vlogControllers.addVlog);
  app.route("/api/fetchAllVlogs").get(vlogControllers.fetchAllVlogs);
  app.route("/api/fetchVlogsByUser").get(vlogControllers.fetchVlogsByUser);
  app.route("/api/fetchSingleVlogDetails").post(vlogControllers.fetchSingleVlogDetails);
  app.route("/api/updateVlog").put(vlogControllers.updateVlog);
  app.route("/api/deleteVlog").delete(vlogControllers.deleteVlog);
  app.route("/api/addVlogComment").post(vlogControllers.addVlogComment);
  app.route("/api/deleteVlogComment").delete(vlogControllers.deleteVlogComment);
  app.route("/api/likeVlog").post(vlogControllers.likeVlog);
  
};
