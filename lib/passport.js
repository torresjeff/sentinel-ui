// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var User = require('./user');

// Load up the user model (DB)
// TODO....

module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
        //done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        done(null, user);
        /*if (user.username == 'jtorresa@co.ibm.com') {
            done(null, { username: user.username, rol: user.rol, nombre: user.nombre }); // TODO: ver si se puede cambiar por user solamente
        }
        else {
            done("error2", "no-user");
        }*/
        /*User.findById(id, function(err, user) {
            done(err, user);
        });*/
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with user (name in the form)
        usernameField : 'user',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, user, password, done) { // callback with email and password from our form
        User.find(user, password, function (err, result) {
            if (err) {
                return done(err);
            }

            if (result.docs.length <= 0) {
                return done(null, false, req.flash('loginMessage', 'Usuario o contraseña incorrectos.'));
            }

            var userInfo = result.docs[0];
            return done(null, { username: userInfo.username, rol: userInfo.rol, nombre: userInfo.nombre });
        });
    }));
};