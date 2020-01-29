const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { expect } = chai;

const { login, createComment } = require("./testData");

chai.use(chaiHttp);

//Test to add comment to a ticket
describe("Add comment to a ticket /api/v1/comment", () => {
  let token;

  before(function(done) {
    chai
      .request(app)
      .post("/api/v1/user/login")
      .send(login)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        expect(res.body).to.have.property("token");
        token = res.body.token;

        done();
      });
  });

  it('Should add comment to a ticket')
  chai
    .request(app)
    .post("/api/v1/comment")
    .send(createTicket)
    .set("authorization", token)
    .end((err, res) => {
      expect(res).to.have.status(201);
      expect(res.body.status).to.equals(true);
      expect(res.body).to.have.property("ticket");
      expect(res.body.ticket).to.be.a("object");
      expect(res.body.message).to.equals("Ticket successfully added!");
      expect(res.body.message).to.be.a("string");
    });

  done();
});
