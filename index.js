var express = require('express')
var twilio = require('twilio');
var dotenv = require('dotenv');
dotenv.load();
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
});

var accentsTidy = function(s){
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

app.get('/negocio/sms', function(req, res, next) {
  var data = req.query;
  var fromNum = data.From;
  var message = 'Hola! ';
  var incomingText = accentsTidy(data.Body);
  if (incomingText == 'hsp') {
    message += 'La historia del café hacienda San Pedro se remonta a los finales del siglo XIX cuando llega a nuestras orillas un joven español de 13 años con una sola maleta y sus sueños. ';
  }
  else if (incomingText == 'meson') {
    message += 'La historia de El Meson Sandwiches comenzó en 1972 en nuestro primer establecimiento en Aguadilla. Somos la primera cadena de comida rápida netamente puertorriqueña, lo que nos llena de sumo orgullo y nos impulsa a continuar elevando los estándares de calidad en el producto y servicio a usted, nuestro invitado. ';
  }
  else {
     message += 'Try something else. ';
  }

  // TODO -- make percentage random.
  var randomPct = Math.floor((Math.random()*100)+1);
  message += 'Tu eres ' + randomPct + '% Boricua.  Visita mas negocios locales para probar cuan Boricua eres.'

  // Return Message.
  var resp = new twilio.TwimlResponse();

  resp.message({
    to: fromNum,
    from: process.env.TWILIO_NUMBER,
  }, message);

  res.writeHead(200, {
    'Content-Type':'text/xml'
  });
  res.end(resp.toString());

});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
