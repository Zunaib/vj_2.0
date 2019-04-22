module.exports = app => {
  const orderControllers = require("../controllers/orderControllers");

  app.route("/api/placeOrder").post(orderControllers.placeOrder);

  
};
