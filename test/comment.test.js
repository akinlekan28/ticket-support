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

  it("Should add comment to a ticket", done => {
    chai
      .request(app)
      .post("/api/v1/comment")
      .set("authorization", token)
      .send(createComment)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body).to.have.property("newComment");
        expect(res.body.newComment).to.be.a("object");
      });

    done();
  });
});

//Test to get all comments
describe("Get all comments /api/v1/comment", () => {
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

  it("Should get all comments", done => {
    chai
      .request(app)
      .get("/api/v1/comment")
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
      });

    done();
  });
});

//Test to get all comments belonging to a ticket
describe("Get ticket comments /api/v1/comment/:id", () => {
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

  it("Should get all comments for a ticket", done => {
    chai
      .request(app)
      .get("/api/v1/comment/2")
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body).to.have.property("comments");
        expect(res.body.comments).to.be.a("array");
      });

    done();
  });
});

//Test for user not able to comment if admin hasn't commented
describe("Do not post comment if admin hasn't commented /api/v1/comment", () => {
  let token;

  //login with a user privilege account
  before(function(done) {
    chai
      .request(app)
      .post("/api/v1/user/login")
      .send({ email: "Snowden@gmail.com", password: "password12" })
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        expect(res.body).to.have.property("token");
        token = res.body.token;

        done();
      });
  });

  it("Should not add comment to a ticket", done => {
    chai
      .request(app)
      .post("/api/v1/comment")
      .send({ commentText: "This is a test suite comment", ticketId: "9" })
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equals(false);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.a("string");
        expect(res.body.message).to.equals(
          "You cannot comment on this ticket unless an admin does"
        );
      });

    done();
  });
});
