process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const testData = require("../seed/testData");
const seedDB = require("../seed/seed");
const mongoose = require("mongoose");

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

  // TEST HOMEPAGE-------------------------
  describe("/homepage", () => {
    it("GET all endpoints", () => {
      return request
        .get("/homepage")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.keys("message");
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
    it("POST article with a specified topic", () => {
      return request
        .post(`/api/topics/${topicsDocs[1].slug}/articles`)
        .send({
          title: "Moongoose or not to moongoose",
          body: "A great man once said moongooes, and I agree",
          belongs_to: "cats",
          votes: 0
        })
        .expect(201)
        .then(res => {
          // console.log(res.body);
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
  });
  // Comments-------------------------------------------------
  describe("/api/articles/:article_id/comments", () => {
    it.only("Get returns comments for specified article", () => {
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
  });
});
