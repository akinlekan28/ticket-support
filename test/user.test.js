const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { expect } = chai;

const { register, login } = require("./testData");

chai.use(chaiHttp);

describe("Register User /api/v1/user/register", () => {
  it("it should register user.", done => {
    chai
      .request(app)
      .post("/api/v1/user/register")
      .send(register)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equals(true);
        expect(res.body).to.have.property("registeredUser");
        expect(res.body.registeredUser).to.be.a("object");

        done();
      });
  });
});

describe("Login User /api/v1/user/login", () => {
  it("it should login a user", done => {
    chai
      .request(app)
      .post("/api/v1/user/login")
      .send(login)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equals(true);
        expect(res.body).to.have.property("token");
        expect(res.body.token).to.be.a("string");

        done();
      });
  });
});

describe("Get User Profile /api/v1/user/me/1", () => {
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

  it("it should get user profile with id of 1", done => {
    chai
      .request(app)
      .get("/api/v1/user/me/1")
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body).to.have.property("profile");
        expect(res.body.profile).to.be.a("object");
      });

    done();
  });
});

describe("Get all Users /api/v1/user", () => {
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

  it("it should get all users /api/v1/user", done => {
    chai
      .request(app)
      .get("/api/v1/user")
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("users");
        expect(res.body.users).to.be.a("array");
      });

    done();
  });
});

describe("Get all Deleted Users /api/v1/user/deleted", () => {
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

  it("it should get all deleted users /api/v1/user/deleted", done => {
    chai
      .request(app)
      .get("/api/v1/user/deleted")
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("users");
        expect(res.body.users).to.be.a("array");
      });

    done();
  });
});

describe("Delete User by id /api/v1/user/delete/5", () => {
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

  it("it should get all deleted users /api/v1/user/delete/5", done => {
    chai
      .request(app)
      .put("/api/v1/user/delete/5")
      .send({role: 'admin'})
      .set("authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("user");
        expect(res.body.status).to.equals(true);
        expect(res.body.message).to.equals("User Successfully deleted!");
        expect(res.body.message).to.be.a("string");
      });

    done();
  });
});
