const CustomerOrders = require("../models/customerOrders");
const DesignerOrders = require("../models/designerOrders");
const Users = require("../models/users");
const Products = require("../models/products");

exports.placeOrder = async (req, res) => {
  let {
    orderedProducts,
    total,
    billingDetails,
    saveDetails,
    paymentMethod
  } = req.body;


  let customerOrderId;
  let C_Order = []; //C_Order = Customer Order

  //Here we create designer orders
  orderedProducts.map(orderProduct => {
    DesignerOrders.create({
      product: orderProduct.productId._id,
      price: orderProduct.productId.price,
      color: orderProduct.productId.color,
      size: orderProduct.productId.size,
      discount: orderProduct.productId.discount,
      status: "Active",
      customer: req.user.id,
      designer: orderProduct.productId.userId,
      customerOrderId: customerOrderId,
      "billingDetails.firstName": billingDetails.firstName,
      "billingDetails.lastName": billingDetails.lastName,
      "billingDetails.province": billingDetails.province,
      "billingDetails.streetAddress": billingDetails.streetAddress,
      "billingDetails.city": billingDetails.city,
      "billingDetails.zipcode": billingDetails.zipcode,
      "billingDetails.country": billingDetails.country,
      "billingDetails.phone": billingDetails.phone,
      paymentMethod: paymentMethod
    })
      .then(order => {
        console.log("Designer Order created successfully");
      })
      .catch(err => console.log(err));

    C_Order.push({
      product: orderProduct.productId._id,
      price: orderProduct.productId.price,
      discount: orderProduct.productId.discount,
      color: orderProduct.productId.color,
      size: orderProduct.productId.size
    });
  });

  //Here we will create the order of the customer
  await CustomerOrders.create({
    products: C_Order,
    customerId: req.user.id,
    total: total
  })
    .then(order => {
      customerOrderId = order._id;
      console.log("Customer Order Created Successfully");
    })
    .catch(err => console.log(err));

  //saveDetails defines that whether to save the delivery settings to user profile or not
  if (saveDetails) {
    Users.findByIdAndUpdate(req.user.id, {
      cart: [],
      firstName: billingDetails.firstName,
      lastName: billingDetails.lastName,
      province: billingDetails.province,
      streetAddress: billingDetails.streetAddress,
      city: billingDetails.city,
      zipcode: billingDetails.zipcode,
      country: billingDetails.country,
      phone: billingDetails.phone
    })
      .lean()
      .then(user =>
        res
          .status(200)
          .json({ message: "Order Placed Successfully", success: true })
      )
      .catch(err =>
        res
          .status(400)
          .json({ message: "Something went wrong", success: false })
      );
  } else {
    Users.findByIdAndUpdate(req.user.id, { cart: [] })
      .lean()
      .then(user =>
        res
          .status(200)
          .json({ message: "Order Placed Successfully", success: true })
      )
      .catch(err =>
        res
          .status(400)
          .json({ message: "Something went wrong", success: false })
      );
  }
};

exports.fetchCustomerOrders = (req, res) => {
  CustomerOrders.find({ customerId: req.user.id })
    .populate({ path: "products.product", populate: { path: "userId" } })
    .sort({ createdAt: -1 })
    .lean()
    .then(orders =>
      res.status(200).json({
        orders: orders,
        success: true,
        message: "Customer Orders Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ message: "Something went wrong", success: false })
    );
};

exports.fetchDesignerOrders = (req, res) => {
  DesignerOrders.find({ designer: req.user.id })
    .populate("product")
    .sort({ createdAt: -1 })
    .lean()
    .then(orders =>
      res.status(200).json({
        orders: orders,
        success: true,
        message: "Designer Orders Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ message: "Something went wrong", success: false })
    );
};

/**
 * Required Parameters (orderId, productId)
 * orderId = CustomerOrders._id
 * productId = CustomerOrders.products._id (It is the autogenerated key for every product in the array of the products)
 */
exports.cancelOrderProductByCustomer = (req, res) => {
  CustomerOrders.findOne({
    customerId: req.user.id,
    _id: req.body.orderId
  })
    .select("products")
    .then(order => {
      console.log(order.products);
    })
    .catch(err => console.log(err));
};
