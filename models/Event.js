var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  _id: { type: String, unique:true, lowercase: true },
  name: String,
  type: { type: String, lowercase: true },
  shortName: { type: String, unique: true, lowercase: true },
  phoneNumber: { type: String, unique: true, index: true },
  state: Boolean,
  // TODO phone # per event.
  votingOptions: [{
    name: { type: String, lowercase: true }, // Name of vote option to display
  }]
  // OR votingOptions: []
  // http://stackoverflow.com/questions/19695058/how-to-define-object-in-array-in-mongoose-schema-correctly-with-2d-geo-index
});

eventSchema.pre('save', function(next) {
  // @TODO enforce uniqueness of event here, not on the schema because of collision with vote.
  this._id = 'event:' + this.shortName;
  return next();
});

if (process.env.NODE_ENV == 'production') {
  eventSchema.set('autoIndex', false);
}

var eventModel = mongoose.model('Event', eventSchema);

module.exports = eventModel;
