module.exports = app => {
    const productControllers = require("../controllers/productControllers");

    app.route("/api/addProduct").post(productControllers.addProduct);
    app.route("/api/fetchAllProducts").get(productControllers.fetchAllProducts);
    app.route("/api/deleteProduct").delete(productControllers.deleteProduct);
    app.route("/api/fetchProducts").get(productControllers.fetchProductsByUser);
    app.route("/api/fetchSingleProductDetails").get(productControllers.fetchSingleProductDetails);
    app.route("/api/fetchProductsByAlbums").get(productControllers.fetchProductsByAlbums);
    app.route("/api/updateProduct").put(productControllers.updateProduct);

};
