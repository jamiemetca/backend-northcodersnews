const commentsRouter = require("express").Router();
const { updateVoteByCommentId } = require("../controllers");

commentsRouter.route("/:comment_id").put(updateVoteByCommentId);

module.exports = { commentsRouter };
