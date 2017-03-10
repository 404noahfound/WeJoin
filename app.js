var express = require('express');
var http = require('http');
var path = require('path');
const join = require('path').join;
var app = express();
const fs = require('fs');

//database setting
var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongodb connected!");
});

//models setting
const models = join(__dirname, 'models');
//require all files in the models folder
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

app.set('port', 1337);

//views setting
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', {layout: true});

//static path setting
app.use(express.static(path.join(__dirname, 'static')));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// send app to router
require('./router')(app);
