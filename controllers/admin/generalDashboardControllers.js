const DesignerOrders = require("../../models/designerOrders");
const Users = require("../../models/users");
const Products = require("../../models/products");

exports.fetchOverallStatistics = async (req, res) => {
  let orderCount, userCount, productCount;
  await DesignerOrders.find({})
    .lean()
    .then(orders => (orderCount = orders.length))
    .catch(err =>
      res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      })
    );
  await Users.find({})
    .lean()
    .then(users => (userCount = users.length))
    .catch(err =>
      res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      })
    );
  await Products.find({})
    .lean()
    .then(products => (productCount = products.length))
    .catch(err =>
      res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      })
    );

  res.status(200).json({
    success: true,
    orderCount: orderCount,
    userCount: userCount,
    productCount: productCount,
    message: "All Statistics fetched successfully"
  });
};

exports.fetchRecentOrders = async (req, res) => {
  let limit = req.query.limit || 10;
  await DesignerOrders.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()
    .then(orders =>
      res.status(200).json({
        success: true,
        orders: orders,
        message: "Recent Orders fetched successfully"
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      })
    );
};

exports.fetchRevenuesAndLastWeekOrders = async (req, res) => {
  let lastYearRevenue, lastWeekRevenue, lastWeekOrders;
  await DesignerOrders.find({
    createdAt: {
      $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
    }
  })
    .sort({ createdAt: -1 })
    .lean()
    .then(orders => {
      let sum = 0;
      orders.map(order => {
        if (order.status == "Completed") {
          sum += order.price;
        }
      });
      lastWeekRevenue = sum;
      lastWeekOrders = orders;
    })
    .catch(err =>
      res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      })
    );

  await DesignerOrders.find({
    createdAt: {
      $gte: new Date(new Date() - 365 * 60 * 60 * 24 * 1000)
    },
    status: "Completed"
  })
    .sort({ createdAt: -1 })
    .lean()
    .then(orders => {
      let sum = 0;
      orders.map(order => (sum += order.price));
      lastYearRevenue = sum;
    })
    .catch(err =>
      res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      })
    );

  res.status(200).json({
    success: true,
    lastWeekOrders: lastWeekOrders,
    lastWeekRevenue: lastWeekRevenue,
    lastYearRevenue: lastYearRevenue,
    message: "Orders and Revenue fetched successfully"
  });
};

exports.fetchSignupsThisWeek = (req, res) => {
  Users.find({
    createdAt: {
      $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
    }
  })
    .sort({ createdAt: -1 })
    .lean()
    .then(users =>
      res.status(200).json({
        success: true,
        usersThisWeek: users,
        message: "Users of this week fetched successfully"
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      })
    );
};

exports.fetchMonthViseRevenue = async (req, res) => {
  let revenues = [
    {
      name: "January",
      value: 0
    },
    {
      name: "Febraury",
      value: 0
    },
    {
      name: "March",
      value: 0
    },
    {
      name: "April",
      value: 0
    },
    {
      name: "May",
      value: 0
    },
    {
      name: "June",
      value: 0
    },
    {
      name: "July",
      value: 0
    },
    {
      name: "August",
      value: 0
    },
    {
      name: "September",
      value: 0
    },
    {
      name: "October",
      value: 0
    },
    {
      name: "November",
      value: 0
    },
    {
      name: "December",
      value: 0
    }
  ];

  await DesignerOrders.find({
    createdAt: {
      $gte: new Date(2019, 01, 01)
    },
    status: "Completed"
  }).then(async orders => {
    await Promise.all(
      orders.map(order => {
        revenues[order.createdAt.getMonth()].value += order.price;
      })
    );
  });

  return res.status(200).json({
    success: true,
    revenues: revenues,
    message: "Monthly Revenues Fetched Successfully"
  });
};
