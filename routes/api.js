const apiRouter = require("express").Router();
const { topicRouter } = require("./topic");
const { articleRouter } = require("./article");
const { commentsRouter } = require("./comment");
const { userRouter } = require("./user");

apiRouter.get("/", (req, res, next) => {
  res.sendFile(
    "/Users/jamiemetcalfe/Coding/Northcoders/sprint/backEndTwo/BE-FT-northcoders-news/public/api.html"
  );
});

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", userRouter);

module.exports = { apiRouter };
