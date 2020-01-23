const ContactUs = require("../../models/contactUs");

exports.contactUs = (req, res) => {
  let { name, email, message } = req.body;

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

exports.fetchAllContactUsQueries = (req, res) => {
  ContactUs.find({})
    .lean()
    .then(queries => {
      return res.status(200).json({
        queries: queries,
        success: true,
        message: "Queries fetch successfully"
      });
    })
    .catch(err => {
      return res.status(400).json({
        message: "Something went wrong"
      });
    });
};

exports.fetchSingleContactUsQuery = (req, res) => {
  ContactUs.findOne({ _id: req.query.queryId })
    .lean()
    .then(query => {
      return res.status(200).json({
        query: query,
        success: true,
        message: "Query fetch successfully"
      });
    })
    .catch(err => {
      return res.status(400).json({
        message: "Something went wrong"
      });
    });
};
