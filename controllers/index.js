const { getTopics } = require("./topic");
const {
  getArticleByTopicSlug,
  postArticleByTopicSlug,
  getArticles,
  getArticlesById
} = require("./article");
const { getCommentsByArticleId, postCommentByArticleId } = require("./comment");

module.exports = {
  getTopics,
  getArticleByTopicSlug,
  postArticleByTopicSlug,
  getTopics,
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
  postCommentByArticleId
};
