module.exports = app => {
    const productControllers = require("../controllers/productControllers");

    app.route("/api/addProduct").post(productControllers.addProduct);
    app.route("/api/fetchAllProducts").get(productControllers.fetchAllProducts);
    app.route("/api/fetchProducts").get(productControllers.fetchProductsByUser);
    app.route("/api/fetchSingleProductDetails?:productId").get(productControllers.fetchSingleProductDetails);
    app.route("/api/fetchProductsByAlbums?:albumId").get(productControllers.fetchProductsByAlbums);
    app.route("/api/updateProduct?:productId").put(productControllers.updateProduct);
    app.route("/api/deleteProduct?:productId").delete(productControllers.deleteProduct);

};
