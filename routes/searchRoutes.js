module.exports = app => {
    const searchControllers = require("../controllers/searchControllers");
  
    app.route("/api/search").post(searchControllers.search);
    
  };
  