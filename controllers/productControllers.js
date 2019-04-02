const Products = require("../models/products");

exports.addProduct = (req, res) => {
    const { productName, quantity, sizes, price } = req.body;
    Products.create({
        productName: productName,
        quantity: quantity,
        price: price
    })
        .then(product => res.json({ product: product }))
        .catch(err => res.json({ error: err }));
}

exports.deleteProduct = (req, res) => {
    const { productId } = req.body;
    Products.updateOne({ _id: productId }, { deletedAt: Date.now() })
        .then(product => res.json({ message: "Product Deleted" }))
        .catch(err => res.json({ err: err }));
}

// exports.updateProduct = (req, res) => {

// }

exports.fetchAllProducts = (req, res) => {
    Products.find({ deletedAt: null })
        .then(product => res.json({ products: product }))
        .catch(err => res.json({ error: err }));
}