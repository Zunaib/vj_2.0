module.exports = app => {
  const vlogControllers = require("../controllers/vlogControllers");

  app.route("/api/addVlog").post(vlogControllers.addVlog);
  app.route("/api/fetchAllVlogs").get(vlogControllers.fetchAllVlogs);
  app.route("/api/fetchVlogsByUser").get(vlogControllers.fetchVlogsByUser);
  app.route("/api/fetchSingleVlogDetails").post(vlogControllers.fetchSingleVlogDetails);
  app.route("/api/updateVlog").put(vlogControllers.updateVlog);
  app.route("/api/deleteVlog").delete(vlogControllers.deleteVlog);
  
};
