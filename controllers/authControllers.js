const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { setToken, verifyToken } = require("../config/auth");
exports.signup = (req, res) => {
  let { password, email, userName } = req.body;

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hashedPassword) {
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
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        }; //JWT Payload. It sets the data in the token

        setToken(payload, (err, token) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "Something went wrong"
            });
          } else {
            res.cookie("access_token", token, { maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).json({
              success: true,
              message: "Logged In",
              isCustomer: user.isCustomer,
              isDesigner: user.isDesigner,
              isBlogger: user.isBlogger,
              isVlogger: user.isVlogger
            });
          }
        });
        // return res.status(200).json({
        //   user: user
        // });
      }
    });
  });
};

exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({
    success: true,
    message: "Logged Out"
  });
};
