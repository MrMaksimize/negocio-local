var mongoose = require('mongoose');

var bizSchema = new mongoose.Schema({
  _id: { type: String, unique:true, lowercase: true },
  name: String,
  shortCode: { type: String, unique: true, lowercase: true, index: true },
  state: Boolean,
  picture: { type: String, default: '' },
  location: {
    addr_1: { type: String, default: '' },
    addr_2: { type: String, default: '' },
    city  : { type: String, default: '' },
    state : { type: String, default: '' },
    zip   : { type: String, default: '' },
    muni  : { type: String, default: '' },
  }
});

bizSchema.pre('save', function(next) {
  this._id = this.shortName;
  return next();
});

if (process.env.NODE_ENV == 'production') {
  eventSchema.set('autoIndex', false);
}

var bizModel = mongoose.model('Business', bizSchema);

module.exports = bizModel;
