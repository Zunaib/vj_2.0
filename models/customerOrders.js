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
        },
        designerOrder: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DesignerOrders"
        }
      }
    ],
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { collection: "CustomerOrders" }
);

customerOrderSchema.set("timestamps", true);

module.exports = mongoose.model("CustomerOrders", customerOrderSchema);
