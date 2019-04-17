module.exports = app => {
  const testGridFs = require("../controllers/testGridFs");

  


  app.route("/api/upload").post( testGridFs.upload);
};
