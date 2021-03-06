const Albums = require("../../models/albums");
const fs = require("fs");

exports.createAlbum = async (req, res) => {
  const { title, year, season, description } = req.body;

  let dir = "assets/uploads/albumThumbnail/";
  let filename = Date.now() + "_" + req.files.file.name;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  await req.files.file.mv(dir + filename);

  let fileWebPath = "/assets/uploads/albumThumbnail/" + filename;

  Albums.create({
    title: title,
    year: year,
    userId: req.user.id,
    season: season,
    description: description,
    thumbnail: fileWebPath
  })
    .then(album =>
      res.json({
        success: true,
        album: album,
        message: "Album Created Successfully"
      })
    )
    .catch(err =>
      res.json({
        success: false,
        err: err,
        message: "Error occured while creating Album"
      })
    );
};

exports.deleteAlbum = (req, res) => {
  Albums.updateOne(
    { _id: req.query.albumId, userId: req.user.id },
    { deletedAt: Date.now() }
  )
    .then(album => {
      if (album.n > 0) {
        res
          .status(200)
          .json({ success: true, message: "Album Deleted Successfully" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Something went wrong" });
      }
    })
    .catch(err => res.json({ err: err }));
};

exports.fetchAlbumsByUser = (req, res) => {
  let userId = req.query.userId || req.user.id;
  if (req.query.limit) {
    Albums.find({ deletedAt: null, userId: userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit))
      .then(album =>
        res.status(200).json({
          success: true,
          albums: album,
          message: "Albums Fetched Successfully"
        })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  } else {
    Albums.find({ deletedAt: null, userId: userId })
      .sort({ createdAt: -1 })
      .then(album => res.status(200).json({ success: true, albums: album }))
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  }
};

/**
 * This will return All the albums in the App regardless of the designer
 */
exports.fetchAllAlbums = (req, res) => {
  Albums.find({ deletedAt: null })
    .sort({ createdAt: -1 })
    .then(album =>
      res.status(200).json({
        success: true,
        albums: album,
        message: "Albums Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

//need to be changed and tested
exports.updateAlbum = async (req, res) => {
  const { title, year, season, description, thumbnail, albumId } = req.body;

  let fileWebPath;
  if (req.files === null) {
    fileWebPath = thumbnail;
    console.log("No files uploaded");
  } else {
    let dir = "assets/uploads/albumThumbnail/";
    let filename = req.user.id + "_" + req.files.file.name;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    await req.files.file.mv(dir + filename);

    fileWebPath = "/assets/uploads/albumThumbnail/" + filename;
  }

  await Albums.updateOne(
    { _id: albumId, userId: req.user.id },
    {
      title: title,
      year: year,
      description: description,
      season: season,
      thumbnail: fileWebPath
    }
  )
    .then(album =>
      res.status(200).json({
        success: true,
        album: album,
        message: "Albums Updated Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchSingleAlbum = (req, res) => {
  Albums.findById(req.body.albumId)
    .lean()
    .then(album =>
      res.status(200).json({
        success: true,
        album: album,
        message: "Album Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};
