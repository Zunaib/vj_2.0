const express = require("express");
const mongoose = require("mongoose");
const passport = require("./config/passport").passport_http_bearer;
const fileUpload = require("express-fileupload");
const path = require("path");

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
    // origin: "http://localhost:3000"
    origin: "*"
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(`/assets/uploads`, express.static(`assets/uploads`));
app.use(express.static(path.join(__dirname, "assets")));

//All Application Routes
const authRoutes = require("./routes/app/authRoutes");
const albumRoutes = require("./routes/app/albumRoutes");
const productRoutes = require("./routes/app/productRoutes");
const useAsRoutes = require("./routes/app/useAsRoutes");
const blogRoutes = require("./routes/app/blogRoutes");
const vlogRoutes = require("./routes/app/vlogRoutes");
const userSettingsRoutes = require("./routes/app/userSettingsRoutes");
const fileUploadGFS = require("./routes/app/fileUploadGFS");
const cartRoutes = require("./routes/app/cartRoutes");
const orderRoutes = require("./routes/app/orderRoutes");
const profileRoutes = require("./routes/app/profileRoutes");
const dropdownRoutes = require("./routes/app/dropdownRoutes");
const searchRoutes = require("./routes/app/searchRoutes");
const messengerRoutes = require("./routes/app/messengerRoutes");
const checkoutStripeRoutes = require("./routes/app/checkoutStripeRoutes");

//All Admin Routes
const contactUsRoutes = require("./routes/admin/contactUsRoutes");
const adminAuthRoutes = require("./routes/admin/authRoutes");
const adminUserDashboardRoutes = require("./routes/admin/userDashboardRoutes");
const orderDashboardRoutes = require("./routes/admin/orderDashboardRoutes");
const generalDashboardRoutes = require("./routes/admin/generalDashboardRoutes");
const productDashboardRoutes = require("./routes/admin/productDashboardRoutes");

/**
 * Below this the routes will not require authorization token
 */

//Application Routes
authRoutes(app);
dropdownRoutes(app);

//Admin Routes
contactUsRoutes(app);
adminAuthRoutes(app);
adminUserDashboardRoutes(app);
orderDashboardRoutes(app);
generalDashboardRoutes(app);
productDashboardRoutes(app);

app.use(
  (req, res, next) => {
    if (req.method.toLowerCase() == "get") {
      req.query.access_token = req.query.access_token;
    } else {
      req.query.access_token = req.query.access_token;
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

//Application Routes
albumRoutes(app);
productRoutes(app);
useAsRoutes(app);
blogRoutes(app);
vlogRoutes(app);
userSettingsRoutes(app);
fileUploadGFS(app);
cartRoutes(app);
orderRoutes(app);
profileRoutes(app);
searchRoutes(app);
messengerRoutes(app);
checkoutStripeRoutes(app);

//Admin Routes

//Server Connection
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
