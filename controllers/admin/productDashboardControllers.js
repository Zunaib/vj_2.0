const Products = require("../../models/products");
const DesignerOrders = require("../../models/designerOrders");

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
    }
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

exports.fetchPopularProducts = (req, res) => {};
