 var express = require('express');
var http = require('http');
var path = require('path');
const join = require('path').join;
var app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var flash = require('express-flash');
var cloudinary = require('cloudinary');

//cloudinary setting 
cloudinary.config({ 
  cloud_name: 'sample', 
  api_key: '874837483274837', 
  api_secret: 'a676b67565c6767a6767d6767f676fe1' 
});


//bodyparse setting
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Flash Setting
app.use(cookieParser('keyboard cat'));
app.use(session({secret: 'anything', cookie: { maxAge: 36000000 }}));
app.use(flash());

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

const User = mongoose.model('User');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());
// passport(user authentication) setting

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Add page Info and user info
var pageInfo = function(req, res, next) {
  res.pageInfo = {title: 'WeJoin'};
  if (req.user) res.pageInfo.username = req.user.username;
  next();
}
app.use(pageInfo);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// send app to router
require('./router')(app);
