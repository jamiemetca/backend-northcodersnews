const mongoose = require("mongoose");
const { User, Article, Comment, Topic } = require("../models");
const { formatArticleData, formatCommentData } = require("../utils");

const seedDB = ({ articlesData, commentsData, topicsData, usersData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(topicsData),
        User.insertMany(usersData)
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      // Don't declare the vote so it defaults to 0. Update with comments
      return Promise.all([
        Article.insertMany(
          formatArticleData(articlesData, topicDocs, userDocs)
        ),
        userDocs,
        topicDocs
      ]);
    })
    .then(([articleDocs, userDocs, topicDocs]) => {
      return Promise.all([
        Comment.insertMany(
          formatCommentData(commentsData, articleDocs, userDocs)
        ),
        userDocs,
        topicDocs,
        articleDocs
      ]);
    })
    .catch(console.log);
};

module.exports = seedDB;

// pass all docs down the promise chain. They are required later.
