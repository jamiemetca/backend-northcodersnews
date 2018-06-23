const articleRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
  postCommentByArticleId
} = require("../controllers");

articleRouter.route("/").get(getArticles);

articleRouter.route("/:article_id").get(getArticlesById);
articleRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = { articleRouter };
