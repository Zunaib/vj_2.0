const express = require("express");
const mongoose = require("mongoose");



const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");

//DB Config
const db = require("./config/mongo.json");

//Connect to the db
mongoose.set("useCreateIndex", true);
mongoose.connect(db.url, { useNewUrlParser: true }, function (err, db) {
  if (!err) {
    console.log("Database Connected");
  }
});

app.use(cors({
  origin: 'http://localhost:3000'
}));


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//All Routes
const authRoutes = require("./routes/authRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const albumRoutes = require("./routes/albumRoutes");
const productRoutes = require("./routes/productRoutes");

authRoutes(app);
contactUsRoutes(app);
albumRoutes(app);
productRoutes(app);

//Server Connection
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
