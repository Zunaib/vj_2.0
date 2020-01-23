const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    firstUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    secondUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    messages: [
      {
        message: {
          type: String,
          required: true
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true
        },
        time: { type: Date, default: Date.now }
      }
    ],
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { collection: "Conversations" }
);

conversationSchema.set("timestamps", true);

module.exports = mongoose.model("Conversations", conversationSchema);
