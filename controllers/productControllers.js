const Products = require("../models/products");
const fs = require("fs");

exports.addProduct = async (req, res) => {
  const {
    productName,
    quantity,
    sizes,
    price,
    albumId,
    discount,
    color,
    description
  } = req.body;
  let dir = "assets/uploads/productImages/";
  let productImages = [];

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  let arr = [].concat(req.files.file);
  arr.map(item => {
    let filename = Date.now() + "_" + item.name;
    fileWebPath = "/assets/uploads/productImages/" + filename;
    item.mv(dir + filename);
    productImages.push(fileWebPath);
  });

  if (albumId) {
    Products.create({
      productName: productName,
      quantity: quantity,
      price: price,
      albumId: albumId,
      userId: req.user.id,
      images: productImages,
      sizes: sizes,
      discount: discount,
      description: description
    })
      .then(product =>
        res
          .status(200)
          .json({
            success: true,
            product: product,
            message: "Product Added Successfully"
          })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  } else {
    Products.create({
      productName: productName,
      color: color,
      quantity: quantity,
      price: price,
      userId: req.user.id,
      images: productImages,
      sizes: sizes,
      discount: discount,
      description: description
    })
      .then(product =>
        res
          .status(200)
          .json({
            success: true,
            product: product,
            message: "Product Added Successfully"
          })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  }
};

exports.deleteProduct = (req, res) => {
  Products.updateOne(
    { _id: req.query.productId, userId: req.user.id },
    { deletedAt: Date.now() }
  )
    .then(product =>
      res
        .status(200)
        .json({ success: true, message: "Product Deleted Successfully" })
    )
    .catch(err =>
      res.status(401).json({ success: false, message: "Something went wrong" })
    );
};

exports.updateProduct = (req, res) => {
  const { productName, quantity, price } = req.body;
  Products.updateOne(
    { _id: req.body.productId, userId: req.user.id },
    {
      productName: productName,
      quantity: quantity,
      price: price
    }
  )
    .then(product =>
      res
        .status(200)
        .json({
          success: true,
          product: product,
          message: "Product Updated Successfully"
        })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchAllProducts = (req, res) => {
  Products.find({ deletedAt: null })
    .sort({ createdAt: -1 })
    .then(product =>
      res
        .status(200)
        .json({
          success: true,
          products: product,
          message: "Products Fetched Successfully"
        })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};
/**
 * Fetches the logged in current user's Products
 */
exports.fetchProductsByUser = (req, res) => {
  if (req.query.limit) {
    Products.find({ deletedAt: null, userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit))
      .then(product =>
        res
          .status(200)
          .json({
            success: true,
            products: product,
            message: "Products Fetched Successfully"
          })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  } else {
    Products.find({ deletedAt: null, userId: req.user.id })
      .sort({ createdAt: -1 })
      .then(product =>
        res
          .status(200)
          .json({
            success: true,
            products: product,
            message: "Products Fetched Successfully"
          })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  }
};

exports.fetchSingleProductDetails = (req, res) => {
  Products.findById(req.body.productId)
    .then(product =>
      res
        .status(200)
        .json({
          success: true,
          products: product,
          message: "Product Fetched Successfully"
        })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchProductsByAlbums = (req, res) => {
  Products.find({ albumId: req.body.albumId, deletedAt: null })
    .sort({ createdAt: -1 })
    .then(product =>
      res
        .status(200)
        .json({
          success: true,
          products: product,
          message: "Products Fetched Successfully"
        })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};
