const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { expect } = chai;

//Test for root url
describe("Server /", () => {
  it("Should get root url /", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.a("string");
        expect(res.body.message).to.equals("Hello World");
      });

    done();
  });
});
