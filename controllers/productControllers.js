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
    color
  } = req.body;
  let dir = "assets/uploads/productImages/";
  let productImages = [];

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  req.files.file.map(item => {
    let filename = Date.now() + "_" + item.name;
    fileWebPath = "/assets/uploads/productImages/" + filename;
    item.mv(dir + filename);
    productImages.push(fileWebPath);
  });

  // let filename1 = Date.now() + "_" + file1.name || null;
  // let filename2 = Date.now() + "_" + file2.name || null;
  // let filename3 = Date.now() + "_" + file3.name || null;
  // let filename4 = Date.now() + "_" + file4.name || null;
  // let filename5 = Date.now() + "_" + file5.name || null;

  // await req.files.file1.mv(dir + filename1);
  // await req.files.file2.mv(dir + filename2);
  // await req.files.file3.mv(dir + filename3);
  // await req.files.file4.mv(dir + filename4);
  // await req.files.file5.mv(dir + filename5);

  // let fileWebPath1 = "/assets/uploads/productImages/" + filename1;
  // let fileWebPath2 = "/assets/uploads/productImages/" + filename2;
  // let fileWebPath3 = "/assets/uploads/productImages/" + filename3;
  // let fileWebPath4 = "/assets/uploads/productImages/" + filename4;
  // let fileWebPath5 = "/assets/uploads/productImages/" + filename5;
  // productImages.push(fileWebPath1);
  // productImages.push(fileWebPath2);
  // productImages.push(fileWebPath3);
  // productImages.push(fileWebPath4);
  // productImages.push(fileWebPath5);

  if (albumId) {
    Products.create({
      productName: productName,
      quantity: quantity,
      price: price,
      albumId: albumId,
      userId: req.user.id,
      images: productImages,
      sizes: sizes,
      discount: discount
    })
      .then(product =>
        res.status(200).json({ success: true, product: product })
      )
      .catch(err => res.status(400).json({ success: false, error: err }));
  } else {
    Products.create({
      productName: productName,
      color: color,
      quantity: quantity,
      price: price,
      userId: req.user.id,
      images: productImages,
      sizes: sizes,
      discount: discount
    })
      .then(product =>
        res.status(200).json({ success: true, product: product })
      )
      .catch(err => res.status(400).json({ success: false, error: err }));
  }
};

exports.deleteProduct = (req, res) => {
  Products.updateOne(
    { _id: req.body.productId, userId: req.user.id },
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
    { _id: req.body.productId, userId: req.user.id },
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
  Products.findById(req.body.productId)
    .then(product => res.status(200).json({ success: true, products: product }))
    .catch(err => res.status(400).json({ success: false, error: err }));
};

exports.fetchProductsByAlbums = (req, res) => {
  Products.find({ albumId: req.body.albumId, deletedAt: null })
    .then(product => res.status(200).json({ success: true, products: product }))
    .catch(err => res.status(400).json({ success: false, error: err }));
};
