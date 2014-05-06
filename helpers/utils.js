
exports.SMSify = function(str) {
  return str.length <= 160 ? str : str.substr(0,157) + '...';
};

exports.initCap = function(str) {
  return str.substring(0,1).toUpperCase() + str.substring(1);
};

exports.testInt = function(str) {
  var intRegex = /^\d+$/;

  if (intRegex.test(str)) {
    return true;
  }

  return false;
};
