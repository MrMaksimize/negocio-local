
module.exports.bootstrap_field = function(name, object) {
  var widgetClasses = object.widget.classes || [];
  widgetClasses.push('form-control');
  object.widget.classes = widgetClasses;
  var labelValue = object.label || object.name;
  var label = '<label for="id_'+ object.name +'" class="control-label">' + labelValue + '</label>';
  var error = object.error ? '<p class="form-error-tooltip">' + object.error + '</p>' : '';

  var widget = '<div class="controls col col-lg-9">' + object.widget.toHTML(name, object) + error + '</div>';
  return '<div class="form-group' + (error !== '' ? 'has-error' : '')  + '">' + label + widget + '</div>';
}

