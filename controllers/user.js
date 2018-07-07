const { User } = require("../models");

const getUserByUsername = (req, res, next) => {
  User.findOne(req.params).then(user => {
    res.send({ user });
  });
};

module.exports = { getUserByUsername };
