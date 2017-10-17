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

var comments = require('./lib/comments');
var assocs = require('./lib/assocs');
var descriptive = require('./lib/descriptive');

function start() {
  
}

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
  return res.redirect('/descubre')
});

app.get('/descubre', function (req, res) {
  return res.render('descubre.ejs', { message: 'Hello, world' });
});

app.get('/lideres', function (req, res) {
  comments.getResultsForType('lider', function (lideres) {
    if (!lideres) {
      return res.render('lideres.ejs', {error: "Ocurrió un error al cargar los datos. Por favor, intente nuevamente.", lideres: []});
    }
    
    if (lideres.length > 0) {
      comments.getCommentSummaryByMonthForEntity(lideres[0]._id, function (summary) {
        // TODO: check if summary not null
        if (!summary) {
          return res.render('lideres.ejs', {error: "Ocurrió un error al cargar los datos. Por favor, intente nuevamente.", lideres: []});
        }

        console.log("Month labels", summary.monthLabels);
        return res.render('lideres.ejs', {
          lideres: lideres,
          summary: summary
        });
      });
    }
    else {
      return res.render('lideres.ejs', {
        error: "Ocurrió un error al cargar los datos. Por favor, intente nuevamente.",
        lideres: [],
        summary: {
          monthLabels: [],
          monthSummaries: []
        }
      });
    }

  });

});

app.get('/instituciones', function (req, res) {
  return res.render('instituciones.ejs');
});

app.get('/casos', function (req, res) {
  descriptive.getAllActivityCounts('activity_count', 'casos', function (casos) {
    if (!casos) {
      return res.render('casos.ejs', { casos: [] });
    }
    if (casos.length > 0) {
      return res.render('casos.ejs', {
        casos: casos
      })
    }
    else {
      return res.render('casos.ejs', {
        error: "Ocurrió un error al cargar los datos. Por favor, intente nuevamente.",
        casos: []
      })
    }
  });
});

app.get('/medios', function (req, res) {
  return res.render('medios.ejs', { message: 'Hello, world' });
});

//////////////////////////////////////////////////////
//                      WS                          //
//////////////////////////////////////////////////////

app.get('/summary/comments/:entity', function (req, res) {
  var entity = req.params.entity;
  comments.getCommentSummaryByMonthForEntity(entity, function (summary) {
      // TODO: check if summary not null
      if (!summary) {
        return res.json({"error": "No summary found."});
      }

      console.log("Month labels", summary.monthLabels);
      return res.json(summary);
    });
});

app.get('/summary/assocs/:year/:month/:type', function (req, res) {
  assocs.getAssocsFor(parseInt(req.params.month), parseInt(req.params.year), req.params.type, function (results) {
    return res.json(results);
  });
});

app.get('/summary/activity/:entity', function (req, res) {
  descriptive.getAllActivityCounts("activity_count", req.params.entity, function (results) {
    return res.json(results);
  });
});


/*
app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}));*/