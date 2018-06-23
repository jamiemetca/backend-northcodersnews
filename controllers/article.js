const { Article, Comment, User } = require("../models");

const getArticleByTopicSlug = (req, res, next) => {
  const { topic_slug: belongs_to } = req.params;
  Article.find({ belongs_to })
    .populate("users")
    .lean()
    .then(articles => {
      return Promise.all([
        articles,
        ...articles.map(article => {
          return Comment.count({ belongs_to: article._id });
        })
      ]);
    })
    .then(([articles, ...countArr]) => {
      articles.map((article, index) => {
        article.count = countArr[index];
        return article;
      });
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
      const article = new Article(newArticle);
      return article.save();
    })
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};

const getArticles = (req, res, next) => {
  Article.find()
    .lean()
    .then(articles => {
      return Promise.all([
        articles,
        ...articles.map(article => {
          return Comment.count({ belongs_to: article._id });
        })
      ]);
    })
    .then(([articles, ...countArr]) => {
      return Promise.all([
        articles.map((article, index) => {
          article.comments = countArr[index];
          return article;
        })
      ]);
    })
    .then(([articles]) => {
      res.send({ articles });
    })
    .catch(next);
};

const getArticlesById = (req, res, next) => {
  const param = {
    _id: req.params.article_id
      ? {
          $in: req.params.article_id
        }
      : { $exists: true }
  };
  Article.find(param)
    .then(articles => {
      res.send({ articles });
    })
    .catch(next);
};

const updateVoteByArticleId = (req, res, next) => {
  const { article_id: _id } = req.params;
  const { vote } = req.query;
  Article.findById({ _id })
    .lean()
    .then(article => {
      let updatedVotes = article.votes;
      vote === "up" ? updatedVotes++ : updatedVotes--;
      return Article.findByIdAndUpdate({ _id }, { votes: updatedVotes });
    })
    .then(() => {
      return Article.findById({ _id });
    })
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};

module.exports = {
  getArticleByTopicSlug,
  postArticleByTopicSlug,
  getArticles,
  getArticlesById,
  updateVoteByArticleId
};