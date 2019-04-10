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
              user: user
            });
          })
          .catch(err => {
            return res.status(400).json({
              success: false,
              message: err
            });
          });
      });
    });
  }
};

exports.login = (req, res) => {
  let { email, password } = req.body;
  // console.log(email);
  // console.log(password);

  Users.findOne({ email: email }).then(user => {

    // console.log("in users.find");
    bcrypt.compare(password, user.password).then(function (isMatch) {

      // console.log(err);
      // console.log("in bcrypt");
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        }; //JWT Payload. It sets the data in the token
        setToken(payload, (err, token) => {

          // console.log("in set token");
          if (err) {
            console.log(err);
            res.status(500).json({
              success: false,
              message: "Something went wrong"
            });
          } else {
            res.cookie("access_token", token, { maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).json({
              token: token,
              success: true,
              message: "Logged In",
              isCustomer: user.isCustomer,
              isDesigner: user.isDesigner,
              isBlogger: user.isBlogger,
              isVlogger: user.isVlogger,
              userId: user._id
            });
          }
        });
        // return res.status(200).json({
        //   user: user
        // });
      }
    })
      .catch(err => {
        // console.log("user pass not match");
        // console.log('in bcrypt catch');
        res.status(500).json({
          success: false,
          message: "Pass_Mismatch"
        });
      });
  })
    .catch(err => {
      // console.log("user email not found");
      // console.log('in users catch');
      res.status(500).json({
        success: false,
        message: "Email_NotFound"
      });
    }

    );
};

exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({
    success: true,
    message: "Logged Out"
  });
};
