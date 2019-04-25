const Users = require("../models/users");
const fs = require("fs");
const path = require("path");

exports.fetchUserSettings = (req, res) => {
  Users.findById(req.user.id)
    .then(user => {
      return res.status(200).json({
        success: true,
        user: user,
        message: "User Settings Fetched Successfully"
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: "Something went wrong"
      });
    });
};

/**
 * General User Settings for All the Users
 */
exports.changeSettings = async (req, res) => {
  // console.log(req.body);
  let {
    firstName,
    lastName,
    dateofbirth,
    description,
    province,
    gender,
    streetAddress,
    city,
    zipcode,
    country,
    phone
  } = req.body;

  let fileWebPath;
  if (req.files === null) {
    fileWebPath = displayPicture;
    console.log("No files uploaded");
  } else {
    let dir = "assets/uploads/userDP/";
    let filename = req.user.id + "_" + req.files.file.name;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    await req.files.file.mv(dir + filename);

    fileWebPath = "/assets/uploads/userDP/" + filename;
  }


  await Users.findByIdAndUpdate(req.user.id, {
    firstName: firstName,
    lastName: lastName,
    dateofbirth: dateofbirth,
    gender: gender,
    description: description,
    province: province,
    streetAddress: streetAddress,
    city: city,
    zipcode: zipcode,
    country: country,
    phone: phone,
    displayPicture: fileWebPath
  })
    .then(user => {
      return res.status(200).json({
        success: true,
        user: user,
        message: "General Settings Changed Successfully"
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: "Something went wrong"
      });
    });
};

exports.changeDesignerSettings = (req, res) => {
  const {
    designerDescription,
    websiteLink,
    pinterestLink,
    behanceLink
  } = req.body;
  Users.findByIdAndUpdate(req.user.id, {
    designerDescription: designerDescription,
    websiteLink: websiteLink,
    pinterestLink: pinterestLink,
    behanceLink: behanceLink
  })
    .then(user =>
      res
        .status(200)
        .json({
          user: user,
          success: true,
          message: "Designer Settings Changed Successfully"
        })
    )
    .catch(err =>
      res
        .status(400)
        .json({ err: err, success: false, message: "Something went wrong" })
    );
};

exports.changeBloggerSettings = (req, res) => {
  const { bloggerDescription } = req.body;
  Users.findByIdAndUpdate(req.user.id, {
    bloggerDescription: bloggerDescription
  })
    .then(user =>
      res
        .status(200)
        .json({
          user: user,
          success: true,
          message: "Blogger Settings Changed Successfully"
        })
    )
    .catch(err =>
      res
        .status(400)
        .json({ err: err, success: false, message: "Something went wrong" })
    );
};

exports.changeVloggerSettings = (req, res) => {
  const { vloggerDescription, youtubeLink } = req.body;
  Users.findByIdAndUpdate(req.user.id, {
    vloggerDescription: vloggerDescription,
    youtubeLink: youtubeLink
  })
    .then(user =>
      res
        .status(200)
        .json({
          user: user,
          success: true,
          message: "Vlogger Settings Changed Successfully"
        })
    )
    .catch(err =>
      res
        .status(400)
        .json({ err: err, success: false, message: "Something went wrong" })
    );
};

exports.fetchGeneralBioDesigner = (req, res) => {
  Users.findById(req.user.id)
    .then(user =>
      res
        .status(200)
        .json({
          generalBioDesigner: user.generalBioDesigner,
          success: true,
          message: "General Bio Designer Fetched Successfully"
        })
    )
    .catch(err =>
      res
        .status(400)
        .json({ err: err, success: false, message: "Something went wrong" })
    );
};

exports.fetchGeneralBioBlogger = (req, res) => {
  Users.findById(req.user.id)
    .then(user =>
      res
        .status(200)
        .json({
          generalBioBlogger: user.generalBioBlogger,
          success: true,
          message: "General Bio Blogger Fetched Successfully"
        })
    )
    .catch(err =>
      res
        .status(400)
        .json({ err: err, success: false, message: "Something went wrong" })
    );
};

exports.fetchGeneralBioVlogger = (req, res) => {
  Users.findById(req.user.id)
    .then(user =>
      res
        .status(200)
        .json({
          generalBioVlogger: user.generalBioVlogger,
          success: true,
          message: "General Bio Vlogger Fetched Successfully"
        })
    )
    .catch(err =>
      res.status(400).json({ message: "Something went wrong", success: false })
    );
};

exports.changeDisplayPicture = async (req, res) => {
  if (req.files === null) {
    console.log("No files uploaded");
  } else {
    let dir = "assets/uploads/userDP/";
    let filename = req.user.id + "_" + req.files.file.name;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    await req.files.file.mv(dir + filename);

    let fileWebPath = "/assets/uploads/userDP/" + filename;
    await Users.findOneAndUpdate(req.user.id, { displayPicture: fileWebPath })
      .then(user =>
        res
          .status(200)
          .json({
            user: user,
            success: true,
            message: "Display Picture Changed Successfully"
          })
      )
      .catch(err =>
        res
          .status(400)
          .json({ err: err, success: false, message: "Something went wrong" })
      );
  }
};

exports.fetchDisplayPicture = async (req, res) => {
  await Users.findById(req.user.id)
    .then(user => {
      return res.json({
        displayPicture: user.displayPicture,
        message: "Display Picture Fetched Successfully"
      });
    })
    .catch(err =>
      res.status(400).json({ message: "Something went wrong", success: false })
    );
};

exports.deleteDisplayPicture = async (req, res) => {
  await Users.findOneAndUpdate(req.user.id, { displayPicture: null })
    .then(user => {
      return res.json({
        user: user,
        message: "Display Picture Deleted Successfully"
      });
    })
    .catch(err =>
      res.status(400).json({ message: "Something went wrong", success: false })
    );
};
