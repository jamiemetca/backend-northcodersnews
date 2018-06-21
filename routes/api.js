const apiRouter = require("express").Router();
const { topicRouter } = require("./topic");

apiRouter.get("/", (req, res, next) => {
  res.sendFile(
    "/Users/jamiemetcalfe/Coding/Northcoders/sprint/backEndTwo/BE-FT-northcoders-news/public/api.html"
  );
});

apiRouter.use("/topics", topicRouter);

module.exports = { apiRouter };
