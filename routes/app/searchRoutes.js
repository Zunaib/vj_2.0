module.exports = app => {
    const searchControllers = require("../../controllers/app/searchControllers");
  
    app.route("/api/search").post(searchControllers.search);
    
  };
  