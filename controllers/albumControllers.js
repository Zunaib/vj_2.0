const Albums = require("../models/albums");

exports.createAlbum = (req, res) => {
  const { albumName, year } = req.body;
  Albums.create({ albumName: albumName, year: year, userId: req.user.id })
    .then(album => res.json({ success: true, album: album }))
    .catch(err => res.json({ success: false, err: err }));
};

exports.deleteAlbum = (req, res) => {
  const { albumId } = req.body;
  Albums.updateOne(
    { _id: albumId, userId: req.user.id },
    { deletedAt: Date.now() }
  )
    .then(album => {
      if (album.n > 0) {
        res.status(200).json({ success: true, message: "Album Deleted" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Something went wrong" });
      }
    })
    .catch(err => res.json({ err: err }));
};

exports.fetchAlbumsByUser = (req, res) => {
  Albums.find({ deletedAt: null, userId: req.user.id })
    .then(album => res.status(200).json({ success: true, albums: album }))
    .catch(err => res.status(400).json({ success: false, error: err }));
};

exports.fetchAllAlbums = (req, res) => {
  Albums.find({ deletedAt: null })
    .then(album => res.status(200).json({ success: true, albums: album }))
    .catch(err => res.status(400).json({ success: false, error: err }));
};

//need to be changed and tested
exports.updateAlbum = (req, res) => {
  const { albumName, year, albumId } = req.body;
  Albums.updateOne(
    { _id: albumId, userId: req.user.id },
    { albumName: albumName, year: year, userId: req.user.id }
  )
    .then(album => res.status(200).json({ success: true, album: album }))
    .catch(err => res.status(400).json({ success: false, err: err }));
};
