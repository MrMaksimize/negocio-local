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
  var event_short = req.params.eventshort;
  Event.findOne({ shortName: event_short }).lean().exec(function(err, eventObject){
    // Use Map Reduce here to get vote counts per option.
    var renderObject = {};
    renderObject.eventObject = eventObject;
    Vote.getVoteCountsForEvent(eventObject.shortName).exec(function(err, result){
      if (err) console.log(err);
      console.log(result);
      renderObject.voteResults = result;
      res.render('event', renderObject);
    });
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
