const { Article, User } = require("../models");

const getArticleByTopicSlug = (req, res, next) => {
  const { topic_slug: belongs_to } = req.params;
  Article.find({ belongs_to })
    .populate("users")
    .then(articles => {
      res.send({ articles });
    })
    .catch(next);
};

const postArticleByTopicSlug = (req, res, next) => {
  const { title, body, votes } = req.body;
  const { topic_slug: belongs_to } = req.params;
  User.find()
    .then(users => {
      const newArticle = {
        title,
        body,
        votes,
        belongs_to,
        created_by: users[1]._id
      };
      Article.create(newArticle);
    })
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};

module.exports = { getArticleByTopicSlug, postArticleByTopicSlug };
