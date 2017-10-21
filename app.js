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
var fs = require('fs');

var csv = require('fast-csv');

var comments = require('./lib/comments');
var assocs = require('./lib/assocs');
var descriptive = require('./lib/descriptive');
var sesgo = require('./lib/sesgo');

var knowledgeBasePath = "../analytics/base-conocimiento/";

var facebookConfig = null;
var paginasMedios = [];
var casos = [];
var lideres = [];
var partidos = [];
var instituciones = [];

function readKnowledgeBase(file, callback) {
  var words = {};
  var wordsArr = []
  csv.fromPath(knowledgeBasePath + file)
    .on("data", function (data) {
      if (!(data[2] in words)) {
        words[data[2]] = {"synonyms": [], "friendly_name": ""};
      }
      words[data[2]]['synonyms'].push(data[0]);
      words[data[2]]['friendly_name'] = data[3];
    })
    .on("end", function () {
      for (var key in words) {
        // check if the property/key is defined in the object itself, not in parent
        if (words.hasOwnProperty(key)) {
          wordsArr.push({"name": words[key]['friendly_name'], "id": key});
        }
      }
      callback(wordsArr);
    });
}

// Read all knowledge bases
function start() {
  facebookConfig = JSON.parse(fs.readFileSync('../facebook-scraper-py/config.medios.json', 'utf8'));
  paginasMedios = facebookConfig['pages']

  readKnowledgeBase("casos-corrupcion.txt", function (res) {
    casos = res;
  });
  readKnowledgeBase("lideres-opinion.txt", function (res) {
    lideres = res;
  });
  readKnowledgeBase("partidos-politicos.txt", function (res) {
    partidos = res;
  });
  readKnowledgeBase("instituciones.txt", function (res) {
    instituciones = res;
  });
}


start();

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
  console.log("server started on port 8080");
});

app.get('/', function (req, res) {
  return res.redirect('/descubre')
});

app.get('/descubre', function (req, res) {
  return res.render('descubre.ejs', { message: 'Hello, world' });
});

app.get('/lideres', function (req, res) {
  comments.getSentimentForLider(lideres[0].id, function (sentiments) {
    console.log("lideres", lideres)
    console.log(sentiments);
    if (!lideres) {
      return res.render('lideres.ejs', {error: "Ocurrió un error al cargar los datos. Por favor, intente nuevamente.", lideres: [], summary: []});
    }
    else {
      return res.render('lideres.ejs', {lideres: lideres, summary: sentiments});
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
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  
  var sesgoCorrupcion;
  var sesgoCasos;
  var sesgoLideres;
  var sesgoPartidos
  var sesgoInstituciones;
  sesgo.getSesgoFor(month, year, "corrupcion", function (sesgoCor) {
    sesgoCorrupcion = sesgoCor;
    sesgo.getSesgoFor(month, year, "casos", function (sesgoC) {
      sesgoCasos = sesgoC;
      sesgo.getSesgoFor(month, year, "lideres", function (sesgoL) {
        sesgoLideres = sesgoL;
        sesgo.getSesgoFor(month, year, "partidos", function (sesgoP) {
          sesgoPartidos = sesgoP;
          sesgo.getSesgoFor(month, year, "instituciones", function (sesgoI) {
            sesgoInstituciones = sesgoI;
            return res.render('medios.ejs', {
              medios: paginasMedios,
              casos: casos,
              lideres: lideres,
              partidos: partidos,
              instituciones: instituciones,
              sesgoCorrupcion: sesgoCorrupcion,
              sesgoCasos: sesgoCasos,
              sesgoLideres: sesgoLideres,
              sesgoPartidos: sesgoPartidos,
              sesgoInstituciones: sesgoInstituciones
            });
          });
        });
      });
    });
  });
});


app.get('/mediostodo', function (req, res) {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  
  var sesgoCorrupcion;
  var sesgoCasos;
  var sesgoLideres;
  var sesgoPartidos
  var sesgoInstituciones;
  sesgo.getSesgoFor(month, year, "corrupcion", function (sesgoCor) {
    sesgoCorrupcion = sesgoCor;
    sesgo.getSesgoFor(month, year, "casos", function (sesgoC) {
      sesgoCasos = sesgoC;
      sesgo.getSesgoFor(month, year, "lideres", function (sesgoL) {
        sesgoLideres = sesgoL;
        sesgo.getSesgoFor(month, year, "partidos", function (sesgoP) {
          sesgoPartidos = sesgoP;
          sesgo.getSesgoFor(month, year, "instituciones", function (sesgoI) {
            sesgoInstituciones = sesgoI;
            return res.render('mediostodo.ejs', {
              medios: paginasMedios,
              casos: casos,
              lideres: lideres,
              partidos: partidos,
              instituciones: instituciones,
              sesgoCorrupcion: sesgoCorrupcion,
              sesgoCasos: sesgoCasos,
              sesgoLideres: sesgoLideres,
              sesgoPartidos: sesgoPartidos,
              sesgoInstituciones: sesgoInstituciones
            });
          });
        });
      });
    });
  });
});

//////////////////////////////////////////////////////
//                      WS                          //
//////////////////////////////////////////////////////
app.get('/summary/sesgo/:year/:month/:entity', function (req, res) {
  var entity = req.params.entity;
  var year = parseInt(req.params.year);
  var month = parseInt(req.params.month);

  sesgo.getSesgoFor(month, year, entity, function (activity) {
    return res.json(activity);
  });

});

app.get('/summary/comments/:entity', function (req, res) {
  var entity = req.params.entity;
  comments.getSentimentForLider(entity, function (summary) {
      // TODO: check if summary not null
      if (!summary) {
        return res.json({"error": "No summary found."});
      }
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