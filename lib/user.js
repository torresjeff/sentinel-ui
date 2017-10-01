var Cloudant = require('cloudant');
var cloudant = null;
var db;
if (process.env.VCAP_SERVICES) {
    cloudant = Cloudant({vcapServices: JSON.parse(process.env.VCAP_SERVICES)});
    console.log("cloudant bluemix");
    db = cloudant.db.use('users');
}
else {
    cloudant = Cloudant("http://admin:pass@localhost:8081");
    console.log("cloudant local");
    db = cloudant.db.use('users');
}

module.exports = {
    find: function (username, password, callback) {
        db.find({selector: {
            "username": username,
            "password": password
        }}, function (err, result) {
                callback(err, result);
        });
    },
    create: function (email, nombre, apellido, callback) {
        db.insert({username: email, nombre: nombre, apellido: apellido, password: "Passw0rd#", rol: "usuario"}, function (err, body) {
            callback(err, body);
        });
    }
}