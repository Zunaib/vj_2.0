module.exports = app => {
    const albumControllers = require("../controllers/albumControllers");

    app.route("/api/createAlbum").post(albumControllers.createAlbum);
    app.route("/api/fetchAlbums").get(albumControllers.fetchAlbums);
    app.route("/api/deleteAlbum").delete(albumControllers.deleteAlbum);

};
