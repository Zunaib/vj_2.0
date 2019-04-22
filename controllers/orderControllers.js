const CustomerOrders = require("../models/customerOrders");
const DesignerOrders = require("../models/designerOrders");
const Users = require("../models/users");
const Products = require("../models/products");

exports.placeOrder = (req, res) => {
  let { orderedProducts } = req.body;

  //Here orders are created to individual designer for each product of their product
  orderedProducts.map(product => {
    Products.findById(product.id)
      .lean()
      .select("userId")
      .then(product => {
        DesignerOrders.create({
          product: product.id,
          price: product.price,
          color: product.color,
          size: product.size,
          discount: product.discount,
          status: "Active",
          customer: req.user.id,
          designer: product.userId
        })
          .then(order =>
            res.status(200).json({ success: true, msg: "Order Created" })
          )
          .catch(err => res.status(400).json({ err: err, success: false }));
      })
      .catch(err => res.status(400).json({ err: err, success: false }));
  });

  //Here we will create the order of the customer
  CustomerOrders.create({products: orderedProducts, customerId: req.user.id})
    .then(order => console.log(order))
    .catch(err => console.log(err));

    Users.findByIdAndUpdate(req.user.id, {cart: []})
    .then(user => console.log(user))
    .catch(err => console.log(err));
};
