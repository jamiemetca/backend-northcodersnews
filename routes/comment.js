const commentsRouter = require("express").Router();
const { updateVoteByCommentId, deleteCommentById } = require("../controllers");

commentsRouter
  .route("/:comment_id")
  .put(updateVoteByCommentId)
  .delete(deleteCommentById);

module.exports = { commentsRouter };
