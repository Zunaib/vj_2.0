const Users = require("../models/users");
const bcrypt = require("bcryptjs");

// let cryptpass = require("../helpers/cryptpass");
exports.signup = (req, res) => {
  let { password, email, userName } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hashedPassword) {
      Users.create({
        email: email,
        userName: userName,
        password: hashedPassword
      })
        .then(user => {
          return res.status(200).json({
            user: user
          });
        })
        .catch(err => {
          return res.status(400).json({
            message: err
          });
        });
    });
  });
};

exports.login = (req, res) => {
  let { email, password } = req.body;
  Users.findOne({ email: email }).then(user => {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        return res.status(200).json({
          user: user
        });
      }
    });
  });
};

