const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: null
    },
    year: {
      type: String,
      default: null
    },
    season: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    thumbnail: {
      type: String,
      default: null
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { collection: "Albums" }
);

albumSchema.set("timestamps", true);

module.exports = mongoose.model("Albums", albumSchema);
