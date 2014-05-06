var chai = require('chai');
var should = chai.should();
var User = require('../models/User');
var Event = require('../models/Event');
var Vote = require('../models/Vote');
var mocks = require('../helpers/mocks');

describe('Event Model', function() {
  it('should create a new Event', function(done) {
    var eventInstance = new Event(mocks.events.unique);
    // Save Event.
    eventInstance.save(function(err) {
      if (err) return done(err);
      done();
    })
  });

  it('should NOT allow to create a new Event with same short code', function(done) {
    var eventInstance = new Event(mocks.events.simple);
    var duplicatedEvent = new Event(mocks.events.simple);
    // Save Event.
    eventInstance.save(function(err) {
      if(err) err.code.should.equal(11000);
    });
    duplicatedEvent.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

});

describe('Vote Model', function() {
  it ('should create a new vote that did not exist', function(done){
    var vote = new Vote(mocks.votes.unique);
    // Save it and let the model middlware populate what we don't know.
    vote.save(function(err, savedVote) {
      if (err) return done(err);
      done();
    });
  });

  it ('should reject duplicated votes', function(done){
    var vote = new Vote(mocks.votes.simple);
    // Save it and let the model middlware populate what we don't know.
    vote.save(function(err, savedVote) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

  it ('should reject votes with unknown options', function(done){
    var vote = new Vote(mocks.votes.uniqueInvalidOption);
    // Save it and let the model middlware populate what we don't know.
    vote.save(function(err, savedVote) {
      if (err) err.message.should.equal('No option matches');
      done();
    });
  });

  it ('should reject votes to unknown events', function(done){
    var vote = new Vote(mocks.votes.uniqueNoEvent);
    // Save it and let the model middlware populate what we don't know.
    vote.save(function(err, savedVote) {
      if (err) err.message.should.equal('No event matches');
      done();
    });

  });
  //it ('should let me vote on multiple events', function(done){});
});

describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) return done(err);
      done();
    })
  });

  it('should not create a user with the unique email', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

  it('should find user by email', function(done) {
    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
      if (err) return done(err);
      user.email.should.equal('test@gmail.com');
      done();
    });
  });

  it('should delete a user', function(done) {
    User.remove({ email: 'test@gmail.com' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});
