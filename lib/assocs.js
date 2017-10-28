var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/facebook'

var db = null;
MongoClient.connect(url, function (err, db_conn) {
	console.log("Connected successfully to Mongo server")
	db = db_conn;
});

module.exports = {
	getAssocsFor: function (month, year, type, callback) {
		var collection = db.collection('assocs');
		collection.findOne({"type": type, "month": month, "year": year}, function (err, doc) {
			if (err) {
				callback(null);
			} else {
				callback(doc);
			}
		});
	},
	getAllAssocsFor: function(type, callback) {
		var collection = db.collection('assocs');
		collection.find({'type': type}).sort({year: -1, month: -1}).toArray(function (err, docs) {
			if (err) {
				callback(null);
			}
			else {
				callback(docs);
			}
		});
	}

}