const expect = require("chai").expect;
const request = require("request");

// Basic test case Syntex
describe("Index.js", () => {
  it("IndexPage", (done) => {
    request("http://localhost:3000/", (err, res, body) => {
      expect(body).to.equal("Hello there");
      done();
    });
  });
});
