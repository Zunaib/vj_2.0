const Users = require("../models/users");

exports.changeSettings = (req, res) => {
    const { firstName, lastName, dateofbirth, gender } = req.body;
    Users.findByIdAndUpdate(req.user.id, {
        firstName: firstName,
        tName: lastName,
        dateofbirth: dateofbirth,
        gender: gender
    }).then(user => {
        return res.status(200).json({
            success: true,
            user: user
        });
    }).catch(err => {
        return res.status(400).json({
            success: false
        });
    });
};

exports.changeGeneralBio = (req, res) => {
    Object.keys(req.body).forEach((key) => {
        console.log(testkey);
    })
}