const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../config/keys");

exports.signup = (req, res) => {
  let { password, email, userName } = req.body;

  console.log("in signup " + password);
  console.log("in signup " + email);
  console.log("in signup " + userName);

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
        const payload = { id: user.id, name: user.name }; //JWT Payload

        jwt.sign(payload, secretOrKey, { expiresIn: "1d" }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });

        // return res.status(200).json({
        //   user: user
        // });
      }
    });
  });
};
