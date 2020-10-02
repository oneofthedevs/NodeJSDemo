// const expect = require("chai").expect;
// const request = require("request");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../routes/post");
const postModel = require("../models/Post");

chai.use(chaiHttp);

const server = "http://localhost:3000/post/";

describe("Posts", () => {
  it("GET /", (done) => {
    chai
      .request(server)
      .get("")
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res).to.have.status(200);
        done();
      });
  });
  it("GET /:id", (done) => {
    chai
      .request(server)
      .get("5f7707b4b0597f22f0cabbcf")
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res).to.have.status(200);
        done();
      });
  });
  it("POST /", (done) => {
    const temp = {
      title: "demo",
      priority: 2,
    };
    chai
      .request(server)
      .post("")
      .set("Content-Type", "application/json")
      .send(temp)
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res).to.have.status(200);
        done();
      });
  });
  it("PUT /", (done) => {
    const temp = {
      title: "Hello there!",
    };
    chai
      .request(server)
      .put("5f7707b4b0597f22f0cabbcf")
      .set("Content-Type", "application/json")
      .send(temp)
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res).to.have.status(200);
        done();
      });
  });
  it("DELETE /", (done) => {
    chai
      .request(server)
      .delete("5f7707b4b0597f22f0cabbcf")
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});
