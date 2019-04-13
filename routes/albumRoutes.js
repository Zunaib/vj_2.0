module.exports = app => {
  const albumControllers = require("../controllers/albumControllers");

  app.route("/api/createAlbum").post(albumControllers.createAlbum);
  app.route("/api/fetchAlbums").get(albumControllers.fetchAlbumsByUser);
  app.route("/api/deleteAlbum?:albumId").delete(albumControllers.deleteAlbum);
  app.route("/api/updateAlbum?:albumId").put(albumControllers.updateAlbum);

  app.route("/api/fetchAllAlbums").get(albumControllers.fetchAllAlbums);
};
