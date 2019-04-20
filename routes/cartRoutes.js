module.exports = app => {
    const cartControllers = require("../controllers/cartControllers");
  
  
    app.route("/api/addToCart").post(cartControllers.addToCart);
    app.route("/api/fetchCart").get(cartControllers.fetchCart);
    app.route("/api/removeFromCart").delete(cartControllers.removeFromCart);
    
    
  };
  