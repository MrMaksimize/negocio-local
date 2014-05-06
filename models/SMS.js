var mongoose = require('mongoose');
var _ = require('underscore');
var S = require ('string');

var Business = require('./Business');

var SMSSchema = new mongoose.Schema({
  _id: { type: String, unique:true, lowercase: true },
  body: { type: String },
  senderPhoneNumber: { type: String },
  business_id: String,
  businessShortCode: String,
});

// Before saving the vote, we need to make sure that there is a corresponding event,
// and also that this user has not voted before.
SMSSchema.pre('save', function(next) {
  var SMS = this;
  // TODO better searching here.
  // Before we look for a business, we need to break down the text and find the short code.
  Business.findOne({ shortCode: sms.smsBody }).lean().exec(function(err, foundBiz) {
    if (err) {
      console.log('Undetected');
      console.log(err);
      return next(err);
    }
    if (!foundBiz || foundBiz == null) {
      err = new Error('No business matches');
      return next(err);
    }
    sms.business_id = foundBiz._id;
    sms.businessShortCode = foundBiz.shortCode;
    sms._id = 'sms:' + business._id + ':' + sms.senderPhoneNumber;
    //var selectedOption = getSelectedVoteOption(vote, foundEvent);
    /*if (_.isEmpty(selectedOption)) {
      err = new Error('No option matches');
      return next(err);
    }*/
    //vote.chosenOption = selectedOption;
    return next();
  });
});

function getSelectedVoteOption(vote, foundEvent) {
  var voteBody = S(vote.voteBody.toLowerCase()).trim().s;
  var selectedOption = {name: null};
    selectedOption =  _.find(foundEvent.votingOptions, function(option) {
      return S(voteBody).contains(option.name);
    });
  // ERROR HERE FOR UNKNOWN OPTIONS. @TODO
  return selectedOption.name;
}


if (process.env.NODE_ENV == 'production') {
  voteSchema.set('autoIndex', false);
}

var SMSModel = mongoose.model('SMS', SMSSchema);

SMSModel.getVoteCountsForEvent = function(eventShort) {
  return voteModel.aggregate(
    { $match: { eventShortName: 'event_2' } },
    { $group: { _id: '$chosenOption', total: { $sum: 1 } } }
  );
}

module.exports = SMSModel;
