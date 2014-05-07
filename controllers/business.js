var Business = require('../models/Business');
var SMS = require('../models/SMS');
var routes = {};
var methods = {};

/*********** Routes **********/

/**
 * GET /events
 * Events page.
 */
routes.index = function(req, res) {
  res.end('test');
};

routes.getBiz = function(req, res) {
  var bizShortCode = req.params.bizshort;
  Business.findOne({ shortCode: bizShortCode}).lean().exec(function(err, bizObject){
    // Use Map Reduce here to get vote counts per option.
    var renderObject = {};
    renderObject.bizObject = bizObject;
    res.render('biz/view_single', renderObject);
  });
}

routes.bizNewForm = function(req, res) {
  var form = Business.createForm({ toHTML: true });
  res.render('biz/create', {
    title: 'Create a Business',
    formHTML: form
  });
};

routes.bizNewFormPost = function(req, res) {
  console.log(req.body);
  req.assert('name', 'Name cannot be blank').notEmpty();

  var errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/businesses/new');
  }

  var business = new Business({
    name: req.body.name,
    shortCode: req.body.shortCode
  });

  business.save(function(err, savedBiz){
    if (err) {
      console.log(err);
      return res.redirect('/businesses/new');
    }
    res.redirect(savedBiz.getURL());
  });

};

/*********** Methods **********/


exports.routes = routes;
exports.methods = methods;
