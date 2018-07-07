const topicRouter = require("express").Router();
const {
  getTopics,
  getArticleByTopicSlug,
  postArticleByTopicSlug
} = require("../controllers");

topicRouter.route("/").get(getTopics);

topicRouter
  .route("/:belongs_to/articles")
  // change the route to /:belongs_to/articles
  .get(getArticleByTopicSlug)
  .post(postArticleByTopicSlug);

module.exports = { topicRouter };
