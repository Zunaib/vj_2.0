const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        message: {
            type: String,
            default: null,
            required: true

        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        },
        deletedAt: {
            type: Date,
            default: null
        },
    },
    { collection: "ContactUs" },

);

module.exports = mongoose.model("ContactUs", contactUsSchema);
