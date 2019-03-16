const express = require('express');
const mongoose =  require('mongoose');

const app = express();

//DB Config
const db =  require('./config/mongo.json');

// Connect to the db
mongoose.connect(db.url, {useNewUrlParser: true},function(err, db) {
  if(!err) {
    console.log("Database Connected");
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));