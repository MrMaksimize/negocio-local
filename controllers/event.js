var Event = require('../models/Event');
var Vote = require('../models/Vote');

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

routes.getEvent = function(req, res) {
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

/*********** Methods **********/


exports.routes = routes;
exports.methods = methods;
