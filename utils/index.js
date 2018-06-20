const grabTopic = (topic, topicDocs) => {
  return topicDocs.reduce((acc, topicDatum) => {
    if (topicDatum.slug === topic) {
      acc = topicDatum.slug;
    }
    return acc;
  }, "");
};

const grabId = (creatorUsername, userDocs) => {
  return userDocs.reduce((acc, userDatum) => {
    //userDocs is undefined
    if (userDatum.username === creatorUsername) {
      acc = userDatum._id;
    }
    return acc;
  }, "");
};

const formatArticleData = (articlesData, topicDocs, userDocs) => {
  return articlesData.map(articleDatum => {
    return {
      ...articleDatum,
      belongs_to: grabTopic(articleDatum.topic, topicDocs),
      votes: 0,
      created_by: grabId(articleDatum.created_by, userDocs)
    };
  });
};

const grabArticle = (articleTitle, articleDocs) => {
  return articleDocs.reduce((acc, articleDatum) => {
    if (articleDatum.title === articleTitle) {
      acc = articleDatum._id;
    }
    return acc;
  }, "");
};

const formatCommentData = (commentsData, articleDocs, userDocs) => {
  return commentsData.map(commentsDatum => {
    const { belongs_to } = commentsDatum;
    return {
      ...commentsDatum,
      belongs_to: grabArticle(belongs_to, articleDocs),
      created_by: grabId(commentsDatum.created_by, userDocs)
    };
  });
};

module.exports = {
  formatArticleData,
  formatCommentData
};
