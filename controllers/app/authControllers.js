const Users = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { setToken, verifyToken } = require("../../config/auth");
const nodemailer = require("nodemailer");
const { secretOrKey } = require("../../config/keys");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "vj.voguejunction@gmail.com",
    pass: "Askari10"
  }
});

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
    let verficationToken;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        Users.create({
          email: email,
          userName: userName,
          password: hashedPassword,
          verficationToken: verficationToken
        })
          .then(user => {
            jwt.sign(
              {
                user: user._id
              },
              secretOrKey,
              {
                expiresIn: "1d"
              },
              (err, emailToken) => {
                const url = `http://localhost:5000/api/confirmation/${emailToken}`;

                transporter.sendMail({
                  to: user.email,
                  subject: "Confirm Email",
                  html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
                });
              }
            );

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

exports.confirmation = (req, res) => {
  const user = jwt.verify(req.params.token, secretOrKey);
  let userId = user.user;
  Users.findByIdAndUpdate(userId, { verified: true }, { new: true })
    .then(user =>
      res.redirect("http://localhost:3000/emailverified")
      // res.status(200).json({
      //   success: true,
      //   message: "User successfully verified"
      // })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        message: "User verification failed"
      })
    );
};

exports.login = (req, res) => {
  let { email, password } = req.body;
  Users.findOne({ $or: [{ email: email }, { userName: email }] })
    .then(user => {
      if (!user.deletedAt) {
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (isMatch) {
            if (!user.verified) {
              res.status(404).send({ message: "User need to be verified" });
            } else {
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
            }
          } else {
            res.status(404).send({ message: "Password Mismatch" });
          }
        });
      } else {
        res.status(400).send({ message: "User is Blocked" });
      }
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
