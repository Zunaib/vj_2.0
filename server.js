const express = require("express");
const mongoose = require("mongoose");
const passport = require("./config/passport").passport_http_bearer;
const fileUpload = require("express-fileupload");

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const Users = require("./models/users");

//DB Config
const db = require("./config/mongo.json");

//Connect to the db
mongoose.set("useCreateIndex", true);
mongoose.connect(db.url, { useNewUrlParser: true }, function (err, db) {
  if (!err) {
    console.log("Database Connected");
  }
});

app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

//All Routes
const authRoutes = require("./routes/authRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const albumRoutes = require("./routes/albumRoutes");
const productRoutes = require("./routes/productRoutes");
const useAsRoutes = require("./routes/useAsRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userSettingsRoutes = require("./routes/userSettingsRoutes");
const fileUploadGFS = require("./routes/fileUploadGFS");
/**
 * Below this the routes will not require authorization token
 */

authRoutes(app);
contactUsRoutes(app);

app.use(
  (req, res, next) => {

    if (req.method.toLowerCase() == "get") {
      req.query.access_token = req.query.access_token;
    } else {
      req.body.access_token = req.query.access_token;
    }

    next();
  },
  passport.authenticate("bearer", { session: false }),
  (req, res, next) => {
    req.session = req.user;

    Users.findById(req.user.id, (err, user) => {
      if (user) {
        next();
      } else {
        return res
          .status(403)
          .json({
            status: "forbidden",
            message: "You don't have access to the requested resource",
            data: {}
          })
          .send();
      }
    });
  }
);

/**
 * Below this every Route will require authorization
 */

app.get("/api/testApi", (req, res) => {
  res.json({
    success: true,
    message: "ok",
    data: req.user
  });
});



albumRoutes(app);
productRoutes(app);
useAsRoutes(app);
blogRoutes(app);
userSettingsRoutes(app);
fileUploadGFS(app);

//Server Connection
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
