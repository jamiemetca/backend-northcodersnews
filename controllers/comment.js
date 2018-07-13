const { Comment } = require("../models");

const getCommentsByArticleId = (req, res, next) => {
  const { article_id: belongs_to } = req.params;
  Comment.find({ belongs_to })
    .populate("created_by")
    .lean()
    .then(comments => {
      console.log(comments)
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

const updateVoteByCommentId = (req, res, next) => {
  const { comment_id: _id } = req.params;
  const { vote } = req.query;
  Comment.findById({ _id })
    .lean()
    .then(comment => {
      if (comment === null) {
        return next({ status: 404, message: "Page Not Found" });
      }
      let updatedVotes = comment.votes;
      if (vote === "up") updatedVotes++;
      else if (vote === "down") updatedVotes--;
      return Comment.findByIdAndUpdate({ _id }, { votes: updatedVotes });
    })
    .then(() => {
      return Comment.findById({ _id });
    })
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

const deleteCommentById = (req, res, next) => {
  const { comment_id: _id } = req.params;
  Comment.findByIdAndRemove({ _id })
    .lean()
    .then(comment => {
      res.status(204).send({ comment });
    })
    .catch(next);
};

module.exports = {
  getCommentsByArticleId,
  postCommentByArticleId,
  updateVoteByCommentId,
  deleteCommentById
};
