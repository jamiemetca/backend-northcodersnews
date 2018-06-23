const { getTopics } = require("./topic");
const {
  getArticleByTopicSlug,
  postArticleByTopicSlug,
  getArticles,
  getArticlesById,
  updateVoteByArticleId
} = require("./article");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
  updateVoteByCommentId,
  deleteCommentById
} = require("./comment");
const { getUserByUsername } = require("./user");

module.exports = {
  getTopics,
  getArticleByTopicSlug,
  postArticleByTopicSlug,
  getTopics,
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
  postCommentByArticleId,
  updateVoteByArticleId,
  updateVoteByCommentId,
  deleteCommentById,
  getUserByUsername
};
