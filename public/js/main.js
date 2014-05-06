$(document).ready(function() {
  // Event Pages.
  if ($('h1.page-title').hasClass('event-title')) {
    console.log(appData);
    // http://bost.ocks.org/mike/bar/2/
    // Socket stuff.
    var socket = io.connect();
    socket.on('connect', function() {
      console.log("Connected, lets sign-up for updates about votes for this event");
      socket.emit('event', $('h1.event-title').data('event'));
    });

    socket.on('vote', function(data) {
      console.log(data);
    });
  }
});
