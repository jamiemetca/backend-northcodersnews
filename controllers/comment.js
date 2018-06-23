const { Comment } = require("../models");

const getCommentsByArticleId = (req, res, next) => {
  const { article_id: belongs_to } = req.params;
  Comment.find({ belongs_to })
    .populate("created_by", "username")
    .lean()
    .then(comments => {
      return Promise.all([
        comments,
        ...comments.map(comment => {
          return comment.created_by.username;
        })
      ]);
    })
    .then(([comments, ...usernameArr]) => {
      comments.map((comment, index) => {
        comment.created_by = usernameArr[index];
        return comment;
      });
      res.send({ comments });
    })
    .catch(next);
};

const postCommentByArticleId = (req, res, next) => {
  const { body, created_by } = req.body;
  const { article_id: belongs_to } = req.params;
  const comment = new Comment({
    body,
    belongs_to,
    created_by
  });
  Promise.all([comment.save()])
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

module.exports = { getCommentsByArticleId, postCommentByArticleId };
