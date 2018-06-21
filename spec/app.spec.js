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
  describe("/api", () => {
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
            "__v"
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
          title: "new article",
          body: "This is my new article content",
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
          expect(res.body.article.title).to.equal(`${send.title}`);
        });
    });
  });
});
