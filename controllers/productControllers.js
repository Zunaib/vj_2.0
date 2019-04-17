const Products = require("../models/products");

exports.addProduct = (req, res) => {
  const { productName, quantity, sizes, price, albumId } = req.body;
  if (albumId) {
    Products.create({
      productName: productName,
      quantity: quantity,
      price: price,
      albumId: albumId,
      userId: req.user.id
    })
      .then(product =>
        res.status(200).json({ success: true, product: product })
      )
      .catch(err => res.status(400).json({ success: false, error: err }));
  } else {
    Products.create({
      productName: productName,
      quantity: quantity,
      price: price,
      userId: req.user.id
    })
      .then(product =>
        res.status(200).json({ success: true, product: product })
      )
      .catch(err => res.status(400).json({ success: false, error: err }));
  }
};

exports.deleteProduct = (req, res) => {
  Products.updateOne(
    { _id: req.query.productId, userId: req.user.id },
    { deletedAt: Date.now() }
  )
    .then(product =>
      res.status(200).json({ success: true, message: "Product Deleted" })
    )
    .catch(err => res.status(401).json({ success: false, err: err }));
};

exports.updateProduct = (req, res) => {
  const { productName, quantity, price } = req.body;
  Products.updateOne(
    { _id: req.query.productId, userId: req.user.id },
    {
      productName: productName,
      quantity: quantity,
      price: price,
      updatedAt: Date.now()
    }
  )
    .then(product => res.status(200).json({ success: true, product: product }))
    .catch(err => res.status(400).json({ success: false, err: err }));
};

exports.fetchAllProducts = (req, res) => {
  Products.find({ deletedAt: null })
    .then(product => res.status(200).json({ success: true, products: product }))
    .catch(err => res.status(400).json({ success: false, error: err }));
};
/**
 * Fetches the logged in current user's Products
 */
exports.fetchProductsByUser = (req, res) => {
  Products.find({ deletedAt: null, userId: req.user.id })
    .then(product => res.status(200).json({ success: true, products: product }))
    .catch(err => res.status(400).json({ success: false, error: err }));
};

exports.fetchSingleProductDetails = (req, res) => {
  console.log(req.query.productId);
  Products.findById(req.query.productId)
    .then(product => res.status(200).json({ success: true, products: product }))
    .catch(err => res.status(400).json({ success: false, error: err }));
};

exports.fetchProductsByAlbums = (req, res) => {
  Products.find({ albumId: req.query.albumId, deletedAt: null })
    .then(product => res.status(200).json({ success: true, products: product }))
    .catch(err => res.status(400).json({ success: false, error: err }));
};
