module.exports = app => {
    const orderDashboardControllers = require("../../controllers/admin/orderDashboardControllers");

    app.route("/api/admin/fetchAllOrders").get(orderDashboardControllers.fetchAllOrders);
    app.route("/api/admin/searchOrder").post(orderDashboardControllers.searchOrder);

};
