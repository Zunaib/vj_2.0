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


var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}



app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Enabling Cross Server Request acceptance
app.use(cors(corsOptions));

//All Routes
const authRoutes = require("./routes/authRoutes");

authRoutes(app);

//Server Connection
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
