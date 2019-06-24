const Products = require("../../models/products");
const DesignerOrders = require("../../models/designerOrders");

exports.fetchPopularProducts = (req, res) => {
  Products.aggregate(
    [
      {
        $project: {
          productName: 1,
          description: 1,
          quantity: 1,
          price: 1,
          discount: 1,
          productType: 1,
          images: 1,
          likes: 1,
          views: 1,
          comments: 1,
          sizes: 1,
          colors: 1,
          userId: 1,
          albumId: 1,
          noOfLikes: { $size: "$likes" }
        }
      },
      { $sort: { noOfLikes: -1 } },
      { $limit: 10 },
      { $select: {}}
    ],
    (err, products) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Something went wrong", success: false });
      } else {
        return res.status(200).json({
          products: products,
          success: true,
          message: "Most Popular Products Fetched Successfully"
        });
      }
    }
  );
};
