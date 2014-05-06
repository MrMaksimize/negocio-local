var S = require('string');

var mocks = {};

function getUniqueStringOrNum(base) {
  if (!base) base = '+1';
  var string = base + Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
  return string.substring(0, 12);
}

mocks.sms = {
  simple: {
    senderPhoneNumber: '+17736777755',
    body: 'business_one',
  },
  unique: {
    voterPhoneNumber: getUniqueStringOrNum(),
    eventPhoneNumber: '+19164263342',
    voteBody: 'Yes',
  },
  uniqueInvalidOption: {
    voterPhoneNumber: getUniqueStringOrNum(),
    eventPhoneNumber: '+19164263342',
    voteBody: getUniqueStringOrNum('monkey_'),
  },
  uniqueNoEvent: {
    voterPhoneNumber: getUniqueStringOrNum(),
    eventPhoneNumber: getUniqueStringOrNum(),
    voteBody: 'yes',
  }
};

mocks.businesses= {
  simple: {
    name: 'Business One',
    shortCode: 'business_one',
    state: true,
  },
  unique: {
    name: getUniqueStringOrNum('Business '),
    shortCode: getUniqueStringOrNum('business_'),
    state: true,
  }

};

module.exports = mocks;



