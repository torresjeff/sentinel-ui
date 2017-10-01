/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
//var env = require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)

app.set('view engine', 'ejs'); // Set up ejs for templating

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));


app.listen('8080', '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server started");
});

app.get('/', function (req, res) {
  return res.render('dashboard.ejs', { message: 'Hello, world' });
});


/*
app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}));*/