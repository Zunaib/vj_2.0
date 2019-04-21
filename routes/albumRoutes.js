module.exports = app => {
  const albumControllers = require("../controllers/albumControllers");

  app.route("/api/createAlbum").post(albumControllers.createAlbum);
  app.route("/api/fetchAlbums").get(albumControllers.fetchLatestAlbumsByUser);
  app.route("/api/deleteAlbum").delete(albumControllers.deleteAlbum);
  app.route("/api/updateAlbum").put(albumControllers.updateAlbum);

  app.route("/api/fetchAllAlbums").get(albumControllers.fetchAllAlbums);
};
