var mongoose = require('mongoose');
var _ = require('underscore');
var S = require ('string');

var Event = require('./Event');

var voteSchema = new mongoose.Schema({
  _id: { type: String, unique:true, lowercase: true },
  type: { type: String, lowercase: true, default: 'vote'},
  voteBody: { type: String },
  chosenOption: String,
  event_id: String,
  eventShortName: String,
  voterPhoneNumber: String,
  eventPhoneNumber: String
});

// Before saving the vote, we need to make sure that there is a corresponding event,
// and also that this user has not voted before.
voteSchema.pre('save', function(next) {
  var vote = this;
  Event.findOne({ type: 'event', phoneNumber: this.eventPhoneNumber }).lean().exec(function(err, foundEvent) {
    if (err) {
      console.log('Undetected');
      console.log(err);
      return next(err);
    }
    if (!foundEvent || foundEvent == null) {
      err = new Error('No event matches');
      return next(err);
    }
    vote.event_id = foundEvent._id;
    vote.eventShortName = foundEvent.shortName;
    vote._id = 'vote:' + foundEvent._id + ':' + vote.voterPhoneNumber;
    var selectedOption = getSelectedVoteOption(vote, foundEvent);
    if (_.isEmpty(selectedOption)) {
      err = new Error('No option matches');
      return next(err);
    }
    vote.chosenOption = selectedOption;
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

var voteModel = mongoose.model('Vote', voteSchema);

voteModel.getVoteCountsForEvent = function(eventShort) {
  return voteModel.aggregate(
    { $match: { eventShortName: 'event_2' } },
    { $group: { _id: '$chosenOption', total: { $sum: 1 } } }
  );
}

module.exports = voteModel;
