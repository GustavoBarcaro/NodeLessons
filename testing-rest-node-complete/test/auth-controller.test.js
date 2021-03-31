const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthController = require("../controllers/auth");
const MONGODB_URI =
  "mongodb+srv://Gustavo-barcaro:gs45942252@mycluster.ebvty.gcp.mongodb.net/test-messages?retryWrites=true&w=majority";

describe("Auth controller - Login", () => {
  it("should throw an error if accessing the database fails", (done) => {
    sinon.stub(User, "findOne");
    User.findOne.throws();
    const req = {
      body: {
        email: "test@test.com",
        password: "test",
      },
    };
    AuthController.login(req, {}, () => {}).then(
      (result) => {
        expect(result).to.be.an("error");
        expect(result).to.have.property("statusCode", 500);
        done();
      }
    );
    User.findOne.restore();
  });
});

describe.skip("Auth controller - getUserStatus", () => {
  it("should send a response with a valid user status for an existing user", (done) => {
    mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "test",
          name: "Test",
          posts: [],
          _id: "5c0f66b979af55031b34728a",
        });
        return user.save();
      })
      .then(() => {
        const req = { userId: "5c0f66b979af55031b34728a" };
        const res = {
          statusCode: 500,
          userStatus: null,
          status: (code) => {
            this.statusCode = code;
            return this;
          },
          json: (data) => {
            this.userStatus = data.status;
          },
        };
        AuthController.getUserStatus(
          req,
          res,
          () => {}
        ).then(() => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.userStatus).to.be.equal("I am new!");
          User.deleteMany({})
            .then(() => {
              return mongoose.disconnect();
            })
            .then(() => {
              done();
            });
        });
      })
      .catch((err) => console.log(err));
  });
});
