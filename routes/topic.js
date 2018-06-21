const topicRouter = require("express").Router();
const {
  getTopics,
  getArticleByTopicSlug,
  postArticleByTopicSlug
} = require("../controllers");

topicRouter.route("/").get(getTopics);

topicRouter
  .route("/:topic_slug/articles")
  .get(getArticleByTopicSlug)
  .post(postArticleByTopicSlug);

module.exports = { topicRouter };
