const articleRouter = require("express").Router();
const { commentRouter } = require("./comment");
const {
  getArticles,
  getArticlesById,
  getCommentsByArticleId
} = require("../controllers");

articleRouter.route("/").get(getArticles);

articleRouter.route("/:article_id").get(getArticlesById);
articleRouter.route("/:article_id/comments").get(getCommentsByArticleId);

module.exports = { articleRouter };
