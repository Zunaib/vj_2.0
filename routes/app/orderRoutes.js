module.exports = app => {
  const orderControllers = require("../../controllers/app/orderControllers");

  app.route("/api/placeOrder").post(orderControllers.placeOrder);
  app.route("/api/fetchCustomerOrders").get(orderControllers.fetchCustomerOrders);
  app.route("/api/fetchDesignerOrders").get(orderControllers.fetchDesignerOrders);
  app.route("/api/cancelOrderProductByCustomer").post(orderControllers.cancelOrderProductByCustomer);

  
};
