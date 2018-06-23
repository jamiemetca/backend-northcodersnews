const { User } = require("../models");

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  User.findOne({ username }).then(user => {
    res.send({ user });
  });
};

module.exports = { getUserByUsername };
