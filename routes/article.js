const articleRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
  postCommentByArticleId,
  updateVoteByArticleId
} = require("../controllers");

articleRouter.route("/").get(getArticles);

articleRouter
  .route("/:article_id")
  .get(getArticlesById)
  .put(updateVoteByArticleId);

articleRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = { articleRouter };
