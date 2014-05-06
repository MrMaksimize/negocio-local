var request = require('supertest');
var app = require('../app.js');
var webhookMocks = require('../helpers/webhookMocks');

/*describe('POST /votes/sms', function() {
  it('should return 200 OK', function(done) {
    var smsWebhook = webhookMocks.twilioSMS;
    request(app)
      .post('/votes/sms')
      .send(smsWebhook.data)
      .set('Content-Type', smsWebhook.headers.ContentType)
      .set('User-Agent', smsWebhook.headers.UserAgent)
      .set('X-Twilio-Signature', smsWebhook.headers.XTwilioSignature)
      .expect(200, done);
  });
});*/

describe('GET /', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /login', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /signup', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/signup')
      .expect(200, done);
  });
});

describe('GET /api', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/api')
      .expect(200, done);
  });
});

describe('GET /contact', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/contact')
      .expect(200, done);
  });
});

describe('GET /random-url', function() {
  it('should return 404', function(done) {
    request(app)
      .get('/reset')
      .expect(404, done);
  });
});
