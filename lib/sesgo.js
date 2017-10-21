var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/facebook'

var db = null;
MongoClient.connect(url, function (err, db_conn) {
	console.log("Connected successfully to Mongo server")
	db = db_conn;
});

module.exports = {
	getSesgoFor: function (month, year, entity, callback) {
		var collection = db.collection('sesgo');
		collection.findOne({"month": month, "year": year, "entity": entity}, function (err, doc) {
			if (err) {
				callback(null);
			} else {
				callback(doc);
			}
		});
	}
}