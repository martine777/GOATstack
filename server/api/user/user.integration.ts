import app from '../../server';
import request = require('supertest');

import User from './user.model';

// User Endpoint testing
describe('User API:', function () {
  let user;
  let token;

  // users are cleared from DB seeding
  // add a new testing user
  beforeAll(function () {
    return User.remove({}).then(function () {
      user = new User({
        userName: 'MrFakie',
        email: 'Fakie@mrfake.com',
        password: 'mrfakie'
      });

      return user.save();
    });
  });

  // Encapsolate GET me enpoint
  describe('GET /api/users/me', function () {

    // before every 'it' get new OAuth token representing the user
    beforeAll(function (done) {
      setTimeout(() => request(app)
        .post('/auth/local')
        .send({
          email: 'Fakie@mrfake.com',
          password: 'mrfakie'
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          } else {
            token = res.body.token;
            done();
          }
        }), 2000);
    });

    // If the token was properly set inside the header of the request
    // it should respond with a 200 status code with the user json
    it('should respond with a user profile when authenticated', function (done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          } else {
            expect(res.body._id.toString()).toEqual(user._id.toString());
            expect(res.body.userName).toEqual(user.userName);
            expect(res.body.firstName).toEqual(user.firstName);
            expect(res.body.lastName).toEqual(user.lastName);
            expect(res.body.email).toEqual(user.email);
            done();
          }
        });
    });

    // If the token was improperly / not set to the header
    // status code 401 should be thrown 
    it('should respond with a 401 when not authenticated', function (done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end((err, res) => {
          if (err) {
            done.fail(err);
          } else {
            done();
          }
        });
    });
  });
});
