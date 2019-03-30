const ContactUs = require("../models/contactUs");

exports.contactUs = (req, res) => {
    let { name, email, message } = req.body;

    ContactUs.create({
        name: name,
        email: email,
        message: message
    }).then(contactUs => {
        return res.status(200).json({
            contactUs: contactUs
        });
    }).catch(err => {
        return res.status(400).json({
            message: err
        });
    });

}
