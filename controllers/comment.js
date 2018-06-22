const getCommentsByArticleId = (req, res, next) => {
  console.log(req.params, "<<<<<<<<");
};

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

module.exports = { getCommentsByArticleId };
