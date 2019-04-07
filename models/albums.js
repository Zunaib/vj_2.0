const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
    {
        albumName: {
            type: String,
            required: true,
            default: null
        },
        year: {
            type: String,
            require: true,
            default: null
        },
        products: [{
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", default: null }
        }],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
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
        }
    },
    { collection: "Albums" }
);

module.exports = mongoose.model("Albums", albumSchema);
