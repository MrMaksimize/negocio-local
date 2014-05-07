var mongoose = require('mongoose');
var _ = require('underscore');
var S = require ('string');
var utils = require('../helpers/utils');

var Business = require('./Business');

var SMSSchema = new mongoose.Schema({
  _id: { type: String, unique:true, lowercase: true },
  body: { type: String },
  senderPhoneNumber: { type: String },
  businessShortCode: String,
  sentReply: String
});

SMSSchema.pre('save', function(next) {
  var sms = this;
  sms.body = utils.accentsTidy(sms.body);
  // TODO better searching here.
  // Before we look for a business, we need to break down the text and find the short code.
  Business.findOne({ shortCode: sms.body }).lean().exec(function(err, foundBiz) {
    if (err) {
      console.log('Undetected');
      console.log(err);
      return next(err);
    }
    if (!foundBiz || foundBiz == null) {
      err = new Error('No business matches');
      return next(err);
    }
    sms.businessShortCode = foundBiz.shortCode;
    sms._id = 'sms:' + foundBiz.shortCode + ':' + sms.senderPhoneNumber;
    sms.sentReply = foundBiz.reply;
    return next();
  });
});


if (process.env.NODE_ENV == 'production') {
  voteSchema.set('autoIndex', false);
}

var SMSModel = mongoose.model('SMS', SMSSchema);

module.exports = SMSModel;
