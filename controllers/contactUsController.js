const ContactUs = require("../models/contactUs");

exports.contactUs = (req, res) => {
  let { name, email, message } = req.body;

  console.log("in contact " + name);
  console.log("in contact " + email);
  console.log("in contact " + message);

  ContactUs.create({
    name: name,
    email: email,
    message: message
  })
    .then(contactUs => {
      return res.status(200).json({
        contactUs: contactUs,
        message: "Message Sent Successfully"
      });
    })
    .catch(err => {
      return res.status(400).json({
        message: "Something went wrong"
      });
    });
};
