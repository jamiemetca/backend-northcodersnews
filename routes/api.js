const apiRouter = require("express").Router();
const { topicRouter } = require("./topic");
const { articleRouter } = require("./article");
const { commentsRouter } = require("./comment");

apiRouter.get("/", (req, res, next) => {
  res.sendFile(
    "/Users/jamiemetcalfe/Coding/Northcoders/sprint/backEndTwo/BE-FT-northcoders-news/public/api.html"
  );
});

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = { apiRouter };
