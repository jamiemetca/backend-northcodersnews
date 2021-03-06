const seedDB = require("./seed");
const mongoose = require("mongoose");
const { DB_URL } = require("../config");
const rawData = require("./devData");

mongoose
  .connect(DB_URL)
  .then(() => {
    return seedDB(rawData);
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log(`Successfully disconnected from ${DB_URL}`);
  })
  .catch(console.log);
