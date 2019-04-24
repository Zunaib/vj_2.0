const Users = require("../models/users");

exports.useAsCustomer = (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.user.id },
    {
      isCustomer: true,
      isDesigner: false,
      isBlogger: false,
      isVlogger: false
    }
  )
    .then(user => {
      res.status(200).json({ success: true, message: "Using as Customer" });
    })
    .catch(err =>
      res.status(401).json({ success: false, message: "Something went wrong" })
    );
};

exports.useAsDesigner = (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.user.id },
    {
      isCustomer: false,
      isDesigner: true,
      isBlogger: false,
      isVlogger: false
    }
  )
    .then(user => {
      res.status(200).json({ success: true, message: "Using as Designer" });
    })
    .catch(err =>
      res.status(401).json({ success: false, message: "Something went wrong" })
    );
};

exports.useAsBlogger = (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.user.id },
    {
      isCustomer: false,
      isDesigner: false,
      isBlogger: true,
      isVlogger: false
    }
  )
    .then(user => {
      res.status(200).json({ success: true, message: "Using as Blogger" });
    })
    .catch(err =>
      res.status(401).json({ success: false, message: "Something went wrong" })
    );
};

exports.useAsVlogger = (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.user.id },
    {
      isCustomer: false,
      isDesigner: false,
      isBlogger: false,
      isVlogger: true
    }
  )
    .then(user => {
      res.status(200).json({ success: true, message: "Using as Vlogger" });
    })
    .catch(err =>
      res.status(401).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchUserTypeFlags = (req, res) => {
  Users.findById(req.user.id)
    .select("isCustomer isDesigner isBlogger isVlogger")
    .lean()
    .then(user => res.status(200).json({ userFlags: user, message: "User flags fetched Successfully" }))
    .catch(err => res.status(400).json({ err: err, message: "Something went wrong" }));
};
