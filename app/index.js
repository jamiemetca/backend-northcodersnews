const express = require("express");
const app = express();
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL || require("../config").DB_URL;
const bodyParser = require("body-parser");
const { apiRouter } = require("../routes/api");

app.use(bodyParser.json());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Connected to the ${DB_URL}`);
  })
  .catch(console.log);

app.use('/', express.static('public'))

app.use("/api", apiRouter);

app
  .route("/*")
  .get((req, res, next) => {
    next({ status: 404, message: "Page Not Found" });
  })
  .post((req, res, next) => {
    next({ status: 400, message: `Bad Request` });
  });

app.use((err, req, res, next) => {
  console.log(err);
  err.name === "CastError"
    ? res.status(404).send({ message: "Page Not Found" })
    : err.name === "ValidationError" || err.name === "SyntaxError"
      ? res.status(400).send({ message: `Bad Request ${err.message}` })
      : err.status === 404
        ? res.status(404).send({ message: "Page Not Found" })
        : res.status(500).send({ message: "Internal Server Error" });
});

module.exports = { app };
