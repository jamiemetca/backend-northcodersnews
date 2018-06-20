const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { DB_URL } = require("./config");
const bodyParser = require("body-parser");
const { apiRouter } = require("./routes/api");

// mongoose
//   .connect(DB_URL)
//   .then(() => {
//     console.log(`Connected to the ${DB_URL}`);
//   })
//   .catch(console.log);

app.get("/homepage", (req, res, next) => {
  res.send("Homepage");
});

app.get("/api", (req, res, next) => {
  res.sendFile(
    "/Users/jamiemetcalfe/Coding/Northcoders/sprint/backEndTwo/BE-FT-northcoders-news/public/api.html"
  );
});

app.use(bodyParser.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = { app };
