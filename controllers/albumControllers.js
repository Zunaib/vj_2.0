const Albums = require("../models/albums");
const fs = require("fs");

exports.createAlbum = async (req, res) => {
  const { albumName, year, season, description } = req.body;

  let dir = "assets/uploads/albumThumbnail/";
  let filename = Date.now() + "_" + req.files.file.name;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  await req.files.file.mv(dir + filename);

  let fileWebPath = "/assets/uploads/albumThumbnail/" + filename;

  Albums.create({
    albumName: albumName,
    year: year,
    userId: req.user.id,
    season: season,
    description: description,
    thumbnail: fileWebPath
  })
    .then(album => res.json({ success: true, album: album }))
    .catch(err => res.json({ success: false, err: err }));
};

exports.deleteAlbum = (req, res) => {
  Albums.updateOne(
    { _id: req.body.albumId, userId: req.user.id },
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
  if (req.query.limit) {
    Albums.find({ deletedAt: null, userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit))
      .then(album => res.status(200).json({ success: true, albums: album }))
      .catch(err => res.status(400).json({ success: false, error: err }));
  } else {
    Albums.find({ deletedAt: null, userId: req.user.id })
      .sort({ createdAt: -1 })
      .then(album => res.status(200).json({ success: true, albums: album }))
      .catch(err => res.status(400).json({ success: false, error: err }));
  }
};

/**
 * This will return All the albums in the App regardless of the designer
 */
exports.fetchAllAlbums = (req, res) => {
  Albums.find({ deletedAt: null })
    .sort({ createdAt: -1 })
    .then(album => res.status(200).json({ success: true, albums: album }))
    .catch(err => res.status(400).json({ success: false, error: err }));
};

//need to be changed and tested
exports.updateAlbum = (req, res) => {
  const { albumName, year } = req.body;
  Albums.updateOne(
    { _id: req.body.albumId, userId: req.user.id },
    { albumName: albumName, year: year }
  )
    .then(album => res.status(200).json({ success: true, album: album }))
    .catch(err => res.status(400).json({ success: false, err: err }));
};

exports.fetchSingleAlbum = (req, res) => {
  Albums.findById(req.body.albumId)
    .lean()
    .then(album => res.status(200).json({ success: true, album: album }))
    .catch(err => res.status(400).json({ success: false, error: err }));
};
