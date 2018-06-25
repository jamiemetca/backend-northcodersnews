process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const testData = require("../seed/testData");
const seedDB = require("../seed/seed");
const mongoose = require("mongoose");
const { Comment } = require("../models");

describe("Test_NC_News", () => {
  let topicsDocs;
  let usersDocs;
  let articlesDocs;
  let commentsDocs;
  beforeEach(() => {
    return seedDB(testData).then(docs => {
      [articlesDocs, commentsDocs, topicsDocs, usersDocs] = docs;
    });
  });
  after(() => {
    mongoose.disconnect();
  });

  // HOMEPAGE-------------------------
  describe("/api", () => {
    it("GET html of all endpoints", () => {
      return request.get("/api").expect(200);
    });
    it("GET responds with status 404 and page not found for invalid address", () => {
      return request
        .get("/apiaddress")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("Page Not Found");
        });
    });
  });

  // Topics--------------------------------
  describe("/api/topics", () => {
    it("GET all topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.keys("topics");
          expect(res.body.topics.length).to.equal(2);
          expect(res.body.topics[0]).to.have.all.keys(
            "_id",
            "title",
            "slug",
            "__v"
          );
          expect(res.body.topics[0]._id).to.equal(`${topicsDocs[0]._id}`);
        });
    });
    it("GET responds with 404 and page not found for invalid address", () => {
      return request
        .get("/api/topicaddress")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("Page Not Found");
        });
    });
  });
  describe("/api/topics/:topic_slug/articles", () => {
    it("GET articels by topic slug (keyword)", () => {
      return request
        .get(`/api/topics/${topicsDocs[0].slug}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.keys("articles");
          expect(res.body.articles.length).to.equal(2);
          expect(res.body.articles[0]).to.have.all.keys(
            "_id",
            "title",
            "body",
            "belongs_to",
            "votes",
            "created_by",
            "__v",
            "count"
          );
          expect(res.body.articles[0].belongs_to).to.equal(
            `${topicsDocs[0].slug}`
          );
          const usernames = usersDocs.map(user => user._id);
          expect(`${usernames[0]}`).to.equal(res.body.articles[0].created_by);
        });
    });
    it("GET responds with 404 and page not found for valid request that is not in the database", () => {
      return request
        .get("/api/topics/notASlug/articles")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("Page Not Found");
        });
    });
    it("POST article with a specified topic", () => {
      return request
        .post(`/api/topics/${topicsDocs[1].slug}/articles`)
        .send({
          title: "Moongoose or not to moongoose",
          body: "A great man once said moongoose, and I agree",
          belongs_to: "cats",
          votes: 0
        })
        .expect(201)
        .then(res => {
          expect(res.body).to.have.keys("article");
          expect(res.body.article).to.have.keys(
            "_id",
            "title",
            "body",
            "belongs_to",
            "votes",
            "created_by",
            "__v"
          );
          expect(res.body.article.title).to.equal(
            "Moongoose or not to moongoose"
          );
        });
    });
    it("POST returns 404 page not found, correct data sent to wrong address", () => {
      return request
        .post(`/api/topics/${topicsDocs[1].slug}/articlesssss`)
        .send({
          title: "Moongoose or not to moongoose",
          body: "A great man once said moongoose, and I agree",
          belongs_to: "cats",
          votes: 0
        })
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("Page Not Found");
        });
    });
    it("POST returns 400 bad request for not satisfying protocols", () => {
      return request
        .post(`/api/topics/${topicsDocs[1].slug}/articles`)
        .send({
          body: "A great man once said moongoose, and I agree",
          belongs_to: "cats",
          votes: 0
        })
        .expect(400);
    });
  });
  // Articles--------------------------------------------------
  describe("/api/articles", () => {
    it("GET returns articles and status 200", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.keys("articles");
          expect(res.body.articles.length).to.equal(articlesDocs.length);
          expect(res.body.articles[0]).to.have.keys(
            "_id",
            "title",
            "body",
            "created_by",
            "belongs_to",
            "votes",
            "__v",
            "comments"
          );
          expect(articlesDocs[0]._id.equals(res.body.articles[0]._id));
        });
    });
    it("GET returns 404 for incorrect address", () => {
      return request
        .get("/api/wrongAddress")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("Page Not Found");
        });
    });
  });
  describe("/api/articles/:article_id", () => {
    it("GET returns articles with aritcle_id", () => {
      return request
        .get(`/api/articles/${articlesDocs[2]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.keys("articles");
          expect(res.body.articles[0]).to.have.keys(
            "_id",
            "title",
            "body",
            "created_by",
            "belongs_to",
            "votes",
            "__v"
          );
          expect(articlesDocs[2]._id.equals(res.body.articles._id));
        });
    });
    it("GET returns 404 for articles that does not exist", () => {
      return request
        .get(`/api/articles/${articlesDocs[2]._id}plusSomeMoreStuff`)
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("Page Not Found");
        });
    });
    it("PUT increment the votes on an article by 1", () => {
      return request
        .put(`/api/articles/${articlesDocs[1]._id}?vote=up`)
        .expect(200)
        .then(res => {
          // console.log(res.body);
          expect(res.body).to.have.keys("article");
          expect(res.body.article.votes).to.equal(articlesDocs[1].votes + 1);
        });
    });
    it("PUT decrement the votes on an article by 1", () => {
      return request
        .put(`/api/articles/${articlesDocs[1]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.keys("article");
          expect(res.body.article.votes).to.equal(articlesDocs[1].votes - 1);
        });
    });
    it("PUT returns 404 page not found for incorrect id", () => {
      return request
        .put(`/api/articles/${articlesDocs[1]._id}1234?vote=down`)
        .expect(404)
        .then(res => {
          expect(res.body.message).to.have.equal("Page Not Found");
        });
    });
  });
  describe("/api/articles/:article_id/comments", () => {
    it("Get returns comments for specified article", () => {
      return request
        .get(`/api/articles/${articlesDocs[2]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.keys("comments");
          expect(res.body.comments[0]).to.have.keys(
            "_id",
            "body",
            "belongs_to",
            "created_by",
            "votes",
            "created_at",
            "__v"
          );
          res.body.comments.forEach(comment => {
            expect(comment.belongs_to).to.equal(`${articlesDocs[2]._id}`);
          });
        });
    });
    it("POST a comment linked to specific artilce", () => {
      return request
        .post(`/api/articles/${articlesDocs[1]._id}/comments`)
        .send({
          body: "I used to be a fan but now I'm an air conditioner",
          belongs_to: `${articlesDocs[1]._id}`,
          created_by: `${usersDocs[0]._id}`
        })
        .expect(201)
        .then(res => {
          expect(res.body).to.have.keys("comment");
          expect(res.body.comment[0]).to.have.keys(
            "_id",
            "body",
            "belongs_to",
            "created_by",
            "votes",
            "created_at",
            "__v"
          );
          expect(res.body.comment[0].body).to.equal(
            "I used to be a fan but now I'm an air conditioner"
          );
        });
    });
  });
  // Comments-------------------------------------------------
  describe("/api/comments/:comment_id?vote=up", () => {
    it("PUT increments votes count of comments by 1", () => {
      return request
        .put(`/api/comments/${commentsDocs[3]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.keys("comment");
          expect(res.body.comment.votes).to.equal(commentsDocs[3].votes + 1);
        });
    });
    it("PUT decrements votes count of comments by 1", () => {
      return request
        .put(`/api/comments/${commentsDocs[3]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.keys("comment");
          expect(res.body.comment.votes).to.equal(commentsDocs[3].votes - 1);
        });
    });
    it.only("PUT 404 page not found when using id not in db", () => {
      return request
        .put("/api/comments/5b2ffd7553e9f32ff1eb13b7?vote=down")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("Page Not Found");
        });
    });
  });
  describe("/api/comments/:comment_id", () => {
    it("DELETE deletes comment by comment_id", () => {
      const _idToBeDeleted = commentsDocs[0]._id;
      return request
        .del(`/api/comments/${_idToBeDeleted}`)
        .expect(204)
        .then(res => {
          expect(res.body).to.be.empty;
          return Comment.find();
        })
        .then(comments => {
          expect(comments.length).to.equal(commentsDocs.length - 1);
        });
    });
  });
  describe("/api/users/:username", () => {
    it("GET user by username", () => {
      return request
        .get(`/api/users/${usersDocs[1].username}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.keys("user");
          expect(res.body.user).to.have.keys(
            "_id",
            "username",
            "name",
            "avatar_url",
            "__v"
          );
          expect(res.body.user._id).to.equal(`${usersDocs[1]._id}`);
        });
    });
  });
});
