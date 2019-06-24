const Users = require("../../models/users");
const Products = require("../../models/products");
// import { calculateTotal } from "../helpers/calculateTotal";

exports.addToCart = async (req, res) => {
  const { productId } = req.body;

  await Users.findById(req.user.id)
    .lean()
    .then(user => {
      let { cart } = user;
      let alreadyExist = false;
      cart.map(item => {
        if (item.productId == productId) {
          alreadyExist = true;
        }
      });

      // console.log("already exist:" + alreadyExist);

      if (alreadyExist) {
        return res.status(500).json({
          message: "Item already exist",
          success: false
        });
      } else {
        Users.updateOne(
          { _id: req.user.id },
          {
            $push: { cart: { productId } }
          }
        )
          .then(user => {
            return res.status(200).json({
              cart: cart,
              success: true,
              message: "Added to Cart Successfully"
            });
          })
          .catch(err =>
            res
              .status(400)
              .json({ message: "Something went wrong", success: false })
          );
      }
    });
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  await Users.findByIdAndUpdate(req.user.id, {
    $pull: { cart: { productId: productId } }
  })
    .then(user =>
      res.status(200).json({
        cart: user.cart,
        success: true,
        message: "Removed from Cart Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ message: "Something went wrong", success: false })
    );
};

exports.fetchCart = async (req, res) => {
  await Users.findById(req.user.id)
    .lean()
    .populate("cart.productId")
    .then(user => {
      let total = calculateTotal(user.cart);
      res.status(200).json({
        cart: user.cart,
        success: true,
        total: total,
        message: "Cart Fetched Successfully"
      });
    })
    .catch(err =>
      res.status(400).json({ message: "Something went wrong", success: false })
    );
};

calculateTotal = arr => {
  let totalSum = 0;
  arr.map(item => {
    totalSum += item.productId.price;
  });
  return totalSum;
};
