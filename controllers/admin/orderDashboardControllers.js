const designerOrders = require("../../models/designerOrders");

exports.fetchAllOrders = (req, res) => {
  designerOrders
    .find()
    .sort({ createdAt: -1 })
    .populate("customer", "firstName lastName")
    .populate("designer", "firstName lastName")
    .lean()
    .then(orders =>
      res.status(200).json({
        success: true,
        orders: orders,
        message: "All Orders fetched successfully"
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

exports.searchOrder = (req, res) => {
  let { queryString } = req.body;

  const regex = new RegExp(escapeRegex(queryString), "gi");

  designerOrders
    .find({
      $or: [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { userName: regex }
      ]
    })
    // .select("firstName lastName email displayPicture createdAt deletedAt")
    .sort({ createdAt: -1 })
    .lean()
    .then(orders => {
      return res.status(200).json({
        success: true,
        orders: orders,
        message: "Orders fetched successfully"
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        error: err,
        message: "Something went wrong"
      });
    });
};
