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

app.get('/negocio/sms', function(req, res, next) {
  console.log(req.query);
  var data = req.query;
  var fromNum = data.From;
  var message = 'Hola! ';
  if (data.Body.toLowerCase() == 'hsp') {
    message += 'La historia del café hacienda San Pedro se remonta a los finales del siglo XIX cuando llega a nuestras orillas un joven español de 13 años con una sola maleta y sus sueños. ';
  }
  else if (data.Body.toLowerCase() == 'meson') {
    message += 'La historia de El Meson Sandwiches comenzó en 1972 en nuestro primer establecimiento en Aguadilla. Somos la primera cadena de comida rápida netamente puertorriqueña, lo que nos llena de sumo orgullo y nos impulsa a continuar elevando los estándares de calidad en el producto y servicio a usted, nuestro invitado. ';
  }
  else {
     message += 'Try something else. ';
  }

  // TODO -- make percentage random.
  var randomPct = Math.floor((Math.random()*100)+1);
  message += 'Tu eres ' + randomPct + '% Boricua.  Visita mas negocios locales para probar cuan Boricua eres.'

  // Return Message.
  var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  client.sms.messages.create({
    to: fromNum,
    from: process.env.TWILIO_NUMBER,
    body: message
  }, function(error, message) {
       if (!error) {
         console.log("Message Sent.");
       }
       else {
         console.log('Error');
       }
       res.end('Success');
     });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
