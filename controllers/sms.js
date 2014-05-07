var twiliosig = require('twiliosig');

var Business = require('../models/Business');
var SMS = require('../models/SMS');

module.exports = function(app) {
  console.log('Exports');
  app.post('/sms/receive', receiveSMS);
}


var receiveSMS = function(req, res, next) {
  // If we have an error, explode.
  // Check sig should be off in development.
  if (process.env.NODE_ENV == 'production' && !twiliosig.valid(req, process.env.TWILIO_ACCOUNT_SID)) {
    return res.send(401, 'Invalid Signature');
  }

  fromNum = req.body.From;

  // For Testing
  if (process.env.NODE_ENV == 'development' && fromNum == '+17736777755') {
    fromNum = ('+1' + Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000).substring(0, 12);
  }
  // Create A Stub Vote.
  var sms = new SMS({
    senderPhoneNumber: fromNum,
    body: req.body.Body
  });

  // Save it and let the model middlware populate what we don't know.
  sms.save(function(err, savedSMS) {
    console.log('Saving Done');
    console.log('VOTE');
    console.log(savedVote);
    if (err) {
      console.log(err);
      return res.send(503, err.message);
    }
    io.sockets.in(savedVote.eventShortName).emit('vote', savedVote);
    return res.send(savedVote);

  });
};




