const Users = require("../../models/users");

exports.useAsCustomer = (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.user.id },
    {
      isCreator: false,
      firstTimeLogin: false
    }
  )
    .then(user => {
      res.status(200).json({ success: true, message: "Using as Customer" });
    })
    .catch(err =>
      res.status(401).json({ success: false, message: "Something went wrong" })
    );
};

exports.useAsCreator = (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.user.id },
    {
      isCreator: true,
      firstTimeLogin: false
    }
  )
    .then(user => {
      res.status(200).json({ success: true, message: "Using as Creator" });
    })
    .catch(err =>
      res.status(401).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchUserTypeFlags = (req, res) => {
  Users.findById(req.user.id)
    .select("isCreator firstTimeLogin")
    .lean()
    .then(user => res.status(200).json({ userFlags: user, message: "User flags fetched Successfully" }))
    .catch(err => res.status(400).json({ err: err, message: "Something went wrong" }));
};
