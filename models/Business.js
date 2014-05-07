var mongoose = require('mongoose');
var forms = require('forms');
var mongooseForms = require('../helpers/forms-mongoose');
var formRender = require('../helpers/formRender');
var _ = require('underscore');

var schemaForms = {
  'name': { all: { label: 'Business Title' } },
  'shortCode': { all: { label: 'Short Code', } },
  'location.lines': { all: {label: 'Address', widget:forms.widgets.textarea({rows:3})}},
  'location.city': { all: { label: 'City', } },
  'location.state': { all: { label: 'State', } },
  'location.zip': { all: { label: 'Zip Code', } },
  'location.muni': { all: { label: 'Municipality', } },
  'reply': { all: {label: 'Reply To Texter', widget:forms.widgets.textarea({rows:3})}},
};

var bizSchema = new mongoose.Schema({
  name: {type: String, required: true },
  shortCode: { type: String, unique: true, lowercase: true, index: true },
  state: Boolean,
  picture: { type: String, default: '' },
  location: {
    lines: { type: String, default: '', forms:{all:{widget:forms.widgets.textarea({rows:3})}}},
    city  : { type: String, default: '' },
    state : { type: String, default: '' },
    zip   : { type: String, default: '' },
    muni  : { type: String, default: '' },
  },
  reply: {type: String, required: true},
});

bizSchema.eachPath(function(pathName){
  var schemaPath = bizSchema.path(pathName);
  schemaPath.options.forms = schemaForms[pathName];
});

bizSchema.pre('save', function(next) {
  console.log('presave');
  return next();
});

bizSchema.statics.createForm = function(options) {
  var settings = _.extend({
    formName: 'new',
    toHTML: true,
    instance: {},
  }, options);
  var form = {};
  if (settings.formName == 'new') {
    var form = mongooseForms.create(this, {}, settings.formName);
  }
  // @todo account for edit conditions later.
  return settings.toHTML ? form.toHTML(formRender.bootstrap_field) : form;
};

bizSchema.methods.getURL = function() {
  return '/businesses/' + this.shortCode;
};

if (process.env.NODE_ENV == 'production') {
  bizSchema.set('autoIndex', false);
}

var bizModel = mongoose.model('Business', bizSchema);



module.exports = bizModel;
