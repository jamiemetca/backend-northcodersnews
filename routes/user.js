const userRouter = require("express").Router();
const { getUserByUsername } = require("../controllers");

userRouter.route("/:username").get(getUserByUsername);

module.exports = { userRouter };
