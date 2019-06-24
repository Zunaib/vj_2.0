module.exports = app => {
  const productDashboardControllers = require("../../controllers/admin/productDashboardControllers");

  app
    .route("/api/admin/fetchMonthViseRevenue")
    .get(productDashboardControllers.fetchMonthViseRevenue);

  app
    .route("/api/admin/fetchPopularProducts")
    .get(productDashboardControllers.fetchPopularProducts);
};
