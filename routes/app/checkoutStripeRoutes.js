module.exports = app => {
    const checkoutStripeControllers = require("../../controllers/app/checkoutStripeControllers");
  
    app.route("/api/checkoutViaCard").get(checkoutStripeControllers.checkoutViaCard);
    
  };
  