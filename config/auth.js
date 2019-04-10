var jwt = require("jsonwebtoken");
const { secretOrKey } = require("../config/keys");

exports.setToken = (payloads, callback) => {
  jwt.sign(
    {
      data: payloads
    },
    secretOrKey,
    {},
    (err, token) => {
      callback(err, token);
    }
  );
};

exports.verifyToken = (token, callback) => {
  jwt.verify(token, secretOrKey, (err, decoded) => {
    if (decoded) {
      callback(err, decoded.data);
    } else {
      callback(true, {});
    }
  });
};
