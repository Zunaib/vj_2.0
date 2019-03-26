const Users = require("../models/users");
exports.signup = (req, res) => {
  let { password, email, userName } = req.body;
  hashedPassword = Users.getHashedPassword(password);
  console.log(hashedPassword);
  Users.create({ email: email, userName: userName, password: password })
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
};

exports.login = (req, res) => {};
