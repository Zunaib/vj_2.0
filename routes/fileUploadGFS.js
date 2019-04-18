module.exports = app => {
  const testFs = require("../controllers/testFs");

  app.route("/api/upload").post( testFs.upload);
  app.route("/api/uploadToDB").post( testFs.uploadToDB);
};
