const mongoose = require("mongoose");

const customerOrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products"
        },
        price: {
          type: Number,
          default: 0
        },
        color: {
          type: String,
          default: null
        },
        size: {
          type: String,
          default: null
        },
        discount: {
          type: Number,
          default: 0
        },
        status: {
          type: String,
          default: "Active"
        }
      }
    ],
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now()
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now()
    // },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true },
  { collection: "CustomerOrders" }
);

module.exports = mongoose.model("CustomerOrders", customerOrderSchema);
