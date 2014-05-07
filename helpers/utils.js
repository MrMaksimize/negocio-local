var S = require('string');

module.exports.accentsTidy = function(s){
  var r = s.toLowerCase();
  r = r.replace(new RegExp(/\s/g),"");
  r = r.replace(new RegExp(/[á]/g),"a");
  r = r.replace(new RegExp(/[é]/g),"e");
  r = r.replace(new RegExp(/[í]/g),"i");
  r = r.replace(new RegExp(/ñ/g),"n");
  r = r.replace(new RegExp(/[ó]/g),"o");
  r = r.replace(new RegExp(/[úü]/g),"u");
  return r;
};
