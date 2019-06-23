module.exports = app => {
    const checkoutStripeControllers = require("../controllers/checkoutStripeControllers");
  
    app.route("/api/checkoutViaCard").get(checkoutStripeControllers.checkoutViaCard);
    
  };
  