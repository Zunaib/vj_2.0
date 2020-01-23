module.exports = app => {
    const productControllers = require("../../controllers/app/productControllers");

    app.route("/api/addProduct").post(productControllers.addProduct);
    app.route("/api/fetchAllProducts").get(productControllers.fetchAllProducts);
    app.route("/api/fetchProductsByUser").get(productControllers.fetchProductsByUser);
    app.route("/api/fetchSingleProductDetails").post(productControllers.fetchSingleProductDetails);
    app.route("/api/fetchProductsByAlbums").post(productControllers.fetchProductsByAlbums);
    app.route("/api/updateProduct").put(productControllers.updateProduct);
    app.route("/api/deleteProduct").delete(productControllers.deleteProduct);
    app.route("/api/addProductComment").post(productControllers.addProductComment);
    app.route("/api/deleteProductComment").delete(productControllers.deleteProductComment);
    app.route("/api/likeProduct").post(productControllers.likeProduct);
    app.route("/api/addToFavoriteProducts").get(productControllers.addToFavoriteProducts);
    app.route("/api/fetchFavoriteProducts").get(productControllers.fetchFavoriteProducts);


    // app.route("/api/dislikeProduct").post(productControllers.dislikeProduct);

};
