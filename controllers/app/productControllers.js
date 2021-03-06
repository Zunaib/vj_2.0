const Products = require("../../models/products");
const Users = require("../../models/users");
const fs = require("fs");
let { createNotification } = require("./notificationControllers");

exports.addProduct = async (req, res) => {
  let {
    productName,
    quantity,
    sizes,
    price,
    albumId,
    discount,
    colors,
    type,
    description
  } = req.body;
  sizes = sizes.split(",");
  colors = colors.split(",");
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
      productType: type,
      colors: colors,
      discount: discount,
      description: description
    })
      .then(product =>
        res.status(200).json({
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
      quantity: quantity,
      price: price,
      userId: req.user.id,
      images: productImages,
      sizes: sizes,
      productType: type,
      colors: colors,
      discount: discount,
      description: description
    })
      .then(product =>
        res.status(200).json({
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
  let {
    productName,
    quantity,
    price,
    sizes,
    albumId,
    discount,
    colors,
    description,
    productImages
  } = req.body;
  sizes = sizes.split(",");
  colors = colors.split(",");

  let fileWebPath;
  let newProductImages = [];

  if (req.files === null) {
    let imagesarray = productImages.split(",");
    newProductImages = imagesarray;
    console.log("No files uploaded");
  } else {
    let dir = "assets/uploads/productImages/";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    let arr = [].concat(req.files.file);
    arr.map(item => {
      let filename = Date.now() + "_" + item.name;
      fileWebPath = "/assets/uploads/productImages/" + filename;
      item.mv(dir + filename);
      newProductImages.push(fileWebPath);
    });
  }

  if (albumId) {
    Products.updateOne(
      { _id: req.body.productId, userId: req.user.id },
      {
        productName: productName,
        quantity: quantity,
        albumId: albumId,
        price: price,
        sizes: sizes,
        discount: discount,
        colors: colors,
        description: description,
        images: newProductImages
        // $set : {
        //   "images.$[]": newProductImages
        // }
      }
    )
      .then(product =>
        res.status(200).json({
          success: true,
          product: product,
          message: "Product Updated Successfully"
        })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  } else {
    Products.updateOne(
      { _id: req.body.productId, userId: req.user.id },
      {
        productName: productName,
        quantity: quantity,
        price: price,
        sizes: sizes,
        discount: discount,
        colors: colors,
        description: description,
        images: newProductImages
        // $set : {
        //   "images.$[]": newProductImages
        // }
      }
    )
      .then(product =>
        res.status(200).json({
          success: true,
          product: product,
          message: "Product Updated Successfully"
        })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  }
};

exports.fetchAllProducts = (req, res) => {
  Products.find({ deletedAt: null, userId: { $ne: req.user.id } })
    .sort({ createdAt: -1 })
    .then(product =>
      res.status(200).json({
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
  let userId = req.query.userId || req.user.id;
  if (req.query.limit) {
    Products.find({ deletedAt: null, userId: userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit))
      .then(product =>
        res.status(200).json({
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
    Products.find({ deletedAt: null, userId: userId })
      .sort({ createdAt: -1 })
      .then(product =>
        res.status(200).json({
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

//similarProducts are the latest 4 products from the same designer whose product is currently fetched
exports.fetchSingleProductDetails = async (req, res) => {
  await Products.findById(req.body.productId)
    .populate({
      path: "comments.userId",
      select: {
        firstName: 1,
        lastName: 1
      }
    })
    .populate("userId")
    .then(product => {
      Products.find({
        userId: product.userId,
        _id: { $ne: product._id },
        deletedAt: null
      })
        .sort({ createdAt: -1 })
        .limit(4)
        .lean()
        .then(similarLatestProducts => {
          res.status(200).json({
            success: true,
            product: product,
            similarProducts: similarLatestProducts,
            message: "Product Fetched Successfully"
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchProductsByAlbums = (req, res) => {
  Products.find({ albumId: req.body.albumId, deletedAt: null })
    .sort({ createdAt: -1 })
    .then(product =>
      res.status(200).json({
        success: true,
        products: product,
        message: "Products Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.addProductComment = (req, res) => {
  if (!req.body.comment) {
    res
      .status(400)
      .json({ success: false, message: "Cannot Comment with Empty Body" });
  } else {
    Products.findByIdAndUpdate(
      req.body.productId,
      {
        $push: { comments: { comment: req.body.comment, userId: req.user.id } }
      },
      { new: true }
    )
      .populate({
        path: "comments.userId",
        select: {
          firstName: 1,
          lastName: 1
        }
      })
      .then(product => {
        createNotification(
          product.userId,
          "Comment Added on Product",
          "comment",
          product._id,
          "product"
        );
        Products.find({
          userId: product.userId,
          _id: { $ne: product._id },
          deletedAt: null
        })
          .sort({ createdAt: -1 })
          .limit(4)
          .lean()
          .then(similarLatestProducts => {
            res.status(200).json({
              success: true,
              product: product,
              similarProducts: similarLatestProducts,
              message: "Product Fetched Successfully"
            });
          })
          .catch(err => console.log(err));
      })
      //   res.status(200).json({
      //     success: true,
      //     products: product,
      //     message: "Comment Added Successfully"
      //   })
      // )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  }
};

exports.deleteProductComment = (req, res) => {
  Products.findByIdAndUpdate(req.body.productId, {
    $pull: { comments: { _id: req.body.commentId, userId: req.user.id } }
  })
    .then(product =>
      res.status(200).json({
        success: true,
        products: product,
        message: "Comment Deleted Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.likeProduct = (req, res) => {
  Products.findById(req.body.productId)
    .then(product => {
      if (product.likes.indexOf(req.user.id) > -1) {
        product.likes.pull(req.user.id);
        product.save();
        res.status(200).json({
          success: true,
          products: product,
          message: "Product Unliked Successfully"
        });
      } else {
        createNotification(
          product.userId,
          "Product Liked",
          "like",
          product._id,
          "product"
        );
        product.likes.push(req.user.id);
        product.save();
        res.status(200).json({
          success: true,
          products: product,
          message: "Product Liked Successfully"
        });
      }
    })
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.addToFavoriteProducts = (req, res) => {
  Users.findById(req.user.id)
    .then(user => {
      if (user.favoriteProducts.indexOf(req.query.productId) > -1){
        user.favoriteProducts.pull(req.query.productId);
        user.save();
        res.status(200).json({
          success: true,
          user: user,
          message: "Removed from favorites"
        });
      } else {
        user.favoriteProducts.push(req.query.productId);
        user.save();
        res.status(200).json({
          success: true,
          user: user,
          message: "Added to favorites Successfully"
        });
      }
    }).catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
      );
  // Users.findByIdAndUpdate(
  //   req.user.id,
  //   {
  //     $push: {
  //       favoriteProducts: req.query.productId
  //     }
  //   },
  //   { new: true }
  // )
  //   .then(user =>
  //     res.status(200).json({
  //       success: true,
  //       user: user.favoriteProducts,
  //       message: "Added To Favorites Successfully"
  //     })
  //   )
  //   .catch(err =>
  //     res.status(400).json({ success: false, message: "Something went wrong" })
  //   );
};

exports.fetchFavoriteProducts = (req, res) => {
  Users.findById(req.user.id)
    .select("favoriteProducts")
    .populate("favoriteProducts")
    .lean()
    .then(user =>
      res.status(200).json({
        success: true,
        user: user.favoriteProducts,
        message: "Favorite Products Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};
