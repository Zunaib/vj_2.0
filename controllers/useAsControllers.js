const Users = require("../models/users");

exports.useAsCustomer = (req, res) => {
  Users.updateOne(
    { userId: req.user.id },
    {
      isCustomer: true,
      isDesigner: false,
      isBlogger: false,
      isVlogger: false
    }
  )
    .then(user => {
      if (user.n > 0) {
        res.status(200).json({ success: true, message: "Using as Customer" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Something went wrong" });
      }
    })
    .catch(err => res.json({ err: err }));
};

exports.useAsDesigner = (req, res) => {
  Users.findByIdAndUpdate(
    req.user.id,
    {
      isCustomer: false,
      isDesigner: true,
      isBlogger: false,
      isVlogger: false
    }
  )
    .then(user => {
      if (user.n > 0) {
        res.status(200).json({ success: true, message: "Using as Designer" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Something went wrong" });
      }
    })
    .catch(err => res.json({ err: err }));
};

exports.useAsBlogger = (req, res) => {
  Users.updateOne(
    { userId: req.user.id },
    {
      isCustomer: false,
      isDesigner: false,
      isBlogger: true,
      isVlogger: false
    }
  )
    .then(user => {
      if (user.isDesigner) {
        res.status(200).json({ success: true, message: "Using as Blogger" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Something went wrong" });
      }
    })
    .catch(err => res.json({ err: err }));
};

exports.useAsVlogger = (req, res) => {
  Users.updateOne(
    { userId: req.user.id },
    {
      isCustomer: false,
      isDesigner: false,
      isBlogger: false,
      isVlogger: true
    }
  )
    .then(user => {
      if (user.n > 0) {
        res.status(200).json({ success: true, message: "Using as Vlogger" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Something went wrong" });
      }
    })
    .catch(err => res.json({ err: err }));
};
