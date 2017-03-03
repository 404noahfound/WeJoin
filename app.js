var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

app.set('port', 1337);
app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'jade');
app.set('view options', {layout: true});

app.use(express.static(path.join(__dirname, 'static')));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// send app to router
require('./router')(app);
