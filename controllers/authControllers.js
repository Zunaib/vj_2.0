const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { setToken, verifyToken } = require("../config/auth");
exports.signup = async (req, res) => {
  let { password, email, userName } = req.body;
  let emailExist = false;
  let userNameExist = false;
  await Users.findOne({ email: email }, (err, isMatch) => {
    if (isMatch) {
      emailExist = true;
    }
  });
  await Users.findOne({ userName: userName }, (err, isMatch) => {
    if (isMatch) {
      userNameExist = true;
    }
  });

  if (emailExist || userNameExist) {
    return res
      .status(400)
      .json({ userNameExist: userNameExist, emailExist: emailExist });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        Users.create({
          email: email,
          userName: userName,
          password: hashedPassword
        })
          .then(user => {
            return res.status(200).json({
              success: true,
              user: user,
              message: "User Signup Successful "
            });
          })
          .catch(err => {
            return res.status(400).json({
              success: false,
              message: "Something went wrong"
            });
          });
      });
    });
  }
};

exports.login = (req, res) => {
  let { email, password } = req.body;
  Users.findOne({ $or : [{'email': email}, {'userName': email}] })
    .then(user => {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name
          }; //JWT Payload. It sets the data in the token
          setToken(payload, (err, token) => {
            if (err) {
              console.log(err);
            } else {
              res.cookie("access_token", token, {
                maxAge: 24 * 60 * 60 * 1000
              });
              res.status(200).json({
                token: token,
                success: true,
                message: "Logged In",
                userflags: {
                  isCreator: user.isCreator,
                  firstTimeLogin: user.firstTimeLogin
                },
                userId: user._id
              });
            }
          });
        } else {
          res.status(404).send({ message: "Password Mismatch" });
        }
      });
    })
    .catch(err => {
      res.status(404).send({ message: "Email Not Found" });
    });
};

exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({
    success: true,
    message: "Logged Out"
  });
};
