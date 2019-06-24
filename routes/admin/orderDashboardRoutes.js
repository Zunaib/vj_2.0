module.exports = app => {
  const orderDashboardControllers = require("../../controllers/admin/orderDashboardControllers");
  const orderControllers = require("../../controllers/app/orderControllers");

  app
    .route("/api/admin/fetchAllOrders")
    .get(orderDashboardControllers.fetchAllOrders);
  app
    .route("/api/admin/searchOrder")
    .post(orderDashboardControllers.searchOrder);
  app
    .route("/api/admin/changeOrderStatus")
    .post(orderControllers.changeOrderStatus);
};
