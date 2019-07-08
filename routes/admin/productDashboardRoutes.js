module.exports = app => {
  const productDashboardControllers = require("../../controllers/admin/productDashboardControllers");


  app
    .route("/api/admin/fetchPopularProducts")
    .get(productDashboardControllers.fetchPopularProducts);

    app
    .route("/api/admin/fetchAllProducts")
    .get(productDashboardControllers.fetchAllProducts);
};
