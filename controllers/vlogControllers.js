const Vlogs = require("../models/vlogs");
const fs = require("fs");

exports.addVlog = async (req, res) => {
  const { title, description } = req.body;
  let dir = "assets/uploads/vlogs/";
  let filename = Date.now() + "_" + req.files.file.name;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  await req.files.file.mv(dir + filename);

  let fileWebPath = "/assets/uploads/vlogs/" + filename;

  Vlogs.create({
    title: title,
    description: description,
    userId: req.user.id,
    videoLink: fileWebPath
  })
    .then(vlog =>
      res.json({
        success: true,
        vlog: vlog,
        message: "Vlog Created Successfully"
      })
    )
    .catch(err =>
      res.json({
        success: false,
        err: err,
        message: "Error occured while creating Vlog"
      })
    );
};

exports.deleteVlog = (req, res) => {
  Vlogs.updateOne(
    { _id: req.query.vlogId, userId: req.user.id },
    { deletedAt: Date.now() }
  )
    .then(vlog =>
      res
        .status(200)
        .json({ success: true, message: "Vlog Deleted Successfully" })
    )
    .catch(err =>
      res.status(401).json({ success: false, message: "Something went wrong" })
    );
};

exports.updateVlog = async (req, res) => {
  const { title, description, video, vlogId } = req.body;

  let fileWebPath;
  if (req.files === null) {
    fileWebPath = video;
    console.log("No files uploaded");
  } else {
    let dir = "assets/uploads/vlogs/";
    let filename = Date.now() + "_" + req.files.file.name;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    await req.files.file.mv(dir + filename);

    fileWebPath = "/assets/uploads/vlogs/" + filename;
  }

  Vlogs.updateOne(
    { _id: vlogId, userId: req.user.id },
    {
      title: title,
      description: description,
      videoLink: fileWebPath
    }
  )
    .then(vlog =>
      res.status(200).json({
        success: true,
        vlog: vlog,
        message: "Vlog Updated Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchAllVlogs = (req, res) => {
  Vlogs.find({ deletedAt: null })
    .sort({ createdAt: -1 })
    .then(vlogs =>
      res.status(200).json({
        success: true,
        vlogs: vlogs,
        message: "Vlogs Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};
/**
 * Fetches the logged in current user's Vlogs
 */
exports.fetchVlogsByUser = (req, res) => {
  if (req.query.limit) {
    Vlogs.find({ deletedAt: null, userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit))
      .then(vlogs =>
        res.status(200).json({
          success: true,
          vlogs: vlogs,
          message: "Vlogs Fetched Successfully"
        })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  } else {
    Vlogs.find({ deletedAt: null, userId: req.user.id })
      .sort({ createdAt: -1 })
      .then(vlogs =>
        res.status(200).json({
          success: true,
          vlogs: vlogs,
          message: "Vlogs Fetched Successfully"
        })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  }
};

exports.fetchSingleVlogDetails = (req, res) => {
  Vlogs.findById(req.body.vlogId)
    .then(vlog =>
      res.status(200).json({
        success: true,
        vlog: vlog,
        message: "Vlog Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};
