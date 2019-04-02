module.exports = app => {
    const productControllers = require("../controllers/productControllers");

    app.route("/api/addProduct").post(productControllers.addProduct);
    app.route("/api/fetchAllProducts").get(productControllers.fetchAllProducts);
    app.route("/api/deleteProduct").delete(productControllers.deleteProduct);

};