const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { expect } = chai;

const { login, createTicket } = require("./testData");

chai.use(chaiHttp);

//Test to create a ticket
describe("Create a ticket /api/v1/ticket", () => {
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

  it("it should create a ticket", done => {
    chai
      .request(app)
      .post("/api/v1/ticket")
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
});

//Test to get all tickets
describe("Get all tickets /api/v1/ticket", () => {
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

  it("it should get all ticket", done => {
    chai
      .request(app)
      .get("/api/v1/ticket")
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body).to.have.property("tickets");
        expect(res.body.tickets).to.be.a("array");
      });

    done();
  });
});

//Test to get all active ticket
describe("Get all active tickets /api/v1/ticket/active", () => {
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

  it("it should get all active ticket", done => {
    chai
      .request(app)
      .get("/api/v1/ticket/active")
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body).to.have.property("tickets");
        expect(res.body.tickets).to.be.a("array");
      });

    done();
  });
});

//Test to get all closed ticket
describe("Get all closed tickets /api/v1/ticket/closed", () => {
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

  it("it should get all closed ticket", done => {
    chai
      .request(app)
      .get("/api/v1/ticket/closed")
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body).to.have.property("tickets");
        expect(res.body.tickets).to.be.a("array");
      });

    done();
  });
});

//Test to get a user tickets
describe("Get a user tickets /api/v1/ticket/user/2", () => {
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

  it("it should get a user tickets", done => {
    chai
      .request(app)
      .get("/api/v1/ticket/user/2")
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body).to.have.property("tickets");
        expect(res.body.tickets).to.be.a("array");
      });

    done();
  });
});

//Test to get a ticket by tag
describe("Get a ticket by tag /api/v1/ticket/tag/Tick-HFIFN", () => {
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

  it("it should get a ticket by tag", done => {
    chai
      .request(app)
      .get("/api/v1/ticket/tag/Tick-HFIFN")
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body).to.have.property("ticket");
        expect(res.body.ticket).to.be.a("object");
        expect(res.body.ticket).to.have.property("title");
        expect(res.body.ticket).to.have.property("description");
        expect(res.body.ticket).to.have.property("tag");
        expect(res.body.ticket).to.have.property("userId");
      });

    done();
  });
});

//Test to close a ticket
describe("Close a ticket /api/v1/ticket", () => {
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

  it("it should close a ticket", done => {
    chai
      .request(app)
      .put("/api/v1/ticket")
      .send({"id": "10","role": "admin"})
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body).to.have.property("ticket");
        expect(res.body.message).to.equals("Ticket Successfully closed!");
        expect(res.body.message).to.be.a("string");
      });

    done();
  });
});

//Test to download pdf report
describe("Download ticket report in the last month /api/v1/ticket/report", () => {
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

    it("it should download ticket report in the last month", done => {
      chai
        .request(app)
        .get("/api/v1/ticket/report")
        .set("authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.header('content-type', 'application/pdf')
        });

      done();
    });

})


