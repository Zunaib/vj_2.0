const Users = require("../models/users");
const fs = require("fs");

exports.fetchUserSettings = (req, res) => {
  Users.findById(req.user.id)
    .then(user => {
      return res.status(200).json({
        success: true,
        user: user
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false
      });
    });
};

exports.changeSettings = (req, res) => {
  const {
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

  Users.findByIdAndUpdate(req.user.id, {
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
    phone: phone
  })
    .then(user => {
      return res.status(200).json({
        success: "Updated",
        user: user
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: "Update_Failed"
      });
    });
};

exports.changeGeneralBioDesigner = (req, res) => {
  const { generalBioDesigner } = req.body;
  Users.findByIdAndUpdate(req.user.id, {
    generalBioDesigner: generalBioDesigner
  })
    .then(user => res.status(200).json({ user: user, success: true }))
    .catch(err => res.status(400).json({ err: err, success: false }));
};

exports.changeGeneralBioBlogger = (req, res) => {
  const { generalBioBlogger } = req.body;
  Users.findByIdAndUpdate(req.user.id, { generalBioBlogger: generalBioBlogger })
    .then(user => res.status(200).json({ user: user, success: true }))
    .catch(err => res.status(400).json({ err: err, success: false }));
};

exports.changeGeneralBioVlogger = (req, res) => {
  const { generalBioVlogger } = req.body;
  Users.findByIdAndUpdate(req.user.id, { generalBioVlogger: generalBioVlogger })
    .then(user => res.status(200).json({ user: user, success: true }))
    .catch(err => res.status(400).json({ err: err, success: false }));
};

exports.fetchGeneralBioDesigner = (req, res) => {
  Users.findById(req.user.id)
    .then(user =>
      res
        .status(200)
        .json({ generalBioDesigner: user.generalBioDesigner, success: true })
    )
    .catch(err => res.status(400).json({ err: err, success: false }));
};

exports.fetchGeneralBioBlogger = (req, res) => {
  Users.findById(req.user.id)
    .then(user =>
      res
        .status(200)
        .json({ generalBioBlogger: user.generalBioBlogger, success: true })
    )
    .catch(err => res.status(400).json({ err: err, success: false }));
};

exports.fetchGeneralBioVlogger = (req, res) => {
  Users.findById(req.user.id)
    .then(user =>
      res
        .status(200)
        .json({ generalBioVlogger: user.generalBioVlogger, success: true })
    )
    .catch(err => res.status(400).json({ err: err, success: false }));
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
      .then(user => res.status(200).json({ user: user, success: true }))
      .catch(err => res.status(500).json({ err: err, success: false }));

    // res.json({ success: true });
  }
};

exports.fetchDisplayPicture = async (req, res) => {
  await Users.findById(req.user.id)
    .then(user => {
      return res.json({
        displayPicture: user.displayPicture
      });
    })
    .catch(err => console.log(err));
};

exports.deleteDisplayPicture = async (req, res) => {
  await Users.findOneAndUpdate(req.user.id, {displayPicture: null})
    .then(user => {
      return res.json({
        user: user
      });
    })
    .catch(err => console.log(err));
}