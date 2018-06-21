const { getTopics } = require("./topic");
const { getArticleByTopicSlug, postArticleByTopicSlug } = require("./article");

module.exports = {
  getTopics,
  getArticleByTopicSlug,
  postArticleByTopicSlug
};
