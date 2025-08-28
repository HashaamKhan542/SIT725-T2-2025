// test/projects.api.test.js
// Tests tailored to YOUR Task-6 project structure & API

const { expect } = require("chai");
const request = require("request");

// If you run the server on a different port, set BASE_URL env
const BASE = process.env.BASE_URL || "http://localhost:3000";

describe("Task-6 API & App", function () {
  // Increase timeout a bit in case local Mongo spins up lazily
  this.timeout(8000);

  //
  // 1) Root serves the app shell (index.html)
  //
  it("GET / should respond 200 and deliver HTML", (done) => {
    request(BASE, (err, res, body) => {
      if (err) return done(err);
      expect(res.statusCode).to.equal(200);
      // content-type may include charset; just check it includes html
      expect(res.headers["content-type"] || "").to.include("text/html");
      // sanity check HTML title from your public/index.html
      expect(body).to.include("<title>SIT 725 Prac 5</title>");
      done();
    });
  });

  //
  // 2) GET /api/projects returns the expected envelope
  //
  it("GET /api/projects should return {statusCode:200, data:Array}", (done) => {
    request.get(`${BASE}/api/projects`, { json: true }, (err, res, body) => {
      if (err) return done(err);
      expect(res.statusCode).to.equal(200);
      expect(body).to.be.an("object");
      expect(body).to.have.property("statusCode", 200);
      expect(body).to.have.property("data").that.is.an("array");
      expect(body).to.have.property("message").that.is.a("string");
      // If there are any projects, they should at least have a `title`
      if (body.data.length > 0) {
        expect(body.data[0]).to.have.property("title");
      }
      done();
    });
  });

  //
  // 3) POST /api/projects with a valid payload creates a document
  //    (controller enforces title as required; see controllers/projectsController.js)
  //
  it("POST /api/projects should create a project and return 201 with the created doc", (done) => {
    const payload = {
      title: "Test Project from Mocha",
      image: "images/kitten-99.png",
      link: "About Kitten 99",
      description: "Created during automated tests"
    };

    request.post(
      {
        url: `${BASE}/api/projects`,
        json: true,
        body: payload
      },
      (err, res, body) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(201);
        expect(body).to.be.an("object");
        expect(body).to.have.property("statusCode", 201);
        expect(body).to.have.property("data").that.is.an("object");
        expect(body.data).to.include({ title: payload.title });
        // Mongoose usually returns _id on created docs
        expect(body.data).to.have.property("_id");
        done();
      }
    );
  });

  //
  // 4) POST /api/projects with a missing title returns 400
  //
  it("POST /api/projects without title should return 400", (done) => {
    const bad = { description: "no title" };
    request.post(
      { url: `${BASE}/api/projects`, json: true, body: bad },
      (err, res, body) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(400);
        expect(body).to.have.property("statusCode", 400);
        expect(body).to.have.property("message").that.includes("title");
        done();
      }
    );
  });
});
