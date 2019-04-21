module.exports = app => {
  const albumControllers = require("../controllers/albumControllers");

  app.route("/api/createAlbum").post(albumControllers.createAlbum);
  app.route("/api/fetchAlbumsByUser").get(albumControllers.fetchAlbumsByUser);
  app.route("/api/deleteAlbum").delete(albumControllers.deleteAlbum);
  app.route("/api/updateAlbum").put(albumControllers.updateAlbum);
  app.route("/api/fetchSingleAlbum").post(albumControllers.fetchSingleAlbum);

  app.route("/api/fetchAllAlbums").get(albumControllers.fetchAllAlbums);
};
