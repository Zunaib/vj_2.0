const mongoose = require("mongoose");

const designerOrderSchema = new mongoose.Schema(
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
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    designer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    customerOrderId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerOrders"
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
  { collection: "DesignerOrders" },
  { timestamps: true }
);

module.exports = mongoose.model("DesignerOrders", designerOrderSchema);
