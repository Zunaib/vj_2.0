module.exports = app => {
    const productControllers = require("../controllers/productControllers");

    app.route("/api/addProduct").post(productControllers.addProduct);
    app.route("/api/fetchAllProducts").get(productControllers.fetchAllProducts);
    app.route("/api/fetchProducts").get(productControllers.fetchLatestProductsByUser);
    app.route("/api/fetchSingleProductDetails").post(productControllers.fetchSingleProductDetails);
    app.route("/api/fetchProductsByAlbums").post(productControllers.fetchProductsByAlbums);
    app.route("/api/updateProduct").put(productControllers.updateProduct);
    app.route("/api/deleteProduct").delete(productControllers.deleteProduct);

};
