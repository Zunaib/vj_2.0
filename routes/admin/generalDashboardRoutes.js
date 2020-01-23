module.exports = app => {
  const generalDashboardControllers = require("../../controllers/admin/generalDashboardControllers");

  app
    .route("/api/admin/fetchOverallStatistics")
    .get(generalDashboardControllers.fetchOverallStatistics);
  app
    .route("/api/admin/fetchRecentOrders")
    .get(generalDashboardControllers.fetchRecentOrders);
  app
    .route("/api/admin/fetchRevenues")
    .get(generalDashboardControllers.fetchRevenuesAndLastWeekOrders);
  app
    .route("/api/admin/fetchSignupsThisWeek")
    .get(generalDashboardControllers.fetchSignupsThisWeek);
  app
  .route("/api/admin/fetchMonthViseRevenue")
  .get(generalDashboardControllers.fetchMonthViseRevenue);
};
