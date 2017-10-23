var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/facebook'

var db = null;
MongoClient.connect(url, function (err, db_conn) {
	console.log("Connected successfully to Mongo server")
	db = db_conn;
});

module.exports = {
	getActivityCountFor: function (month, year, type, callback) {
		var collection = db.collection('descriptive');
		collection.findOne({"type": type, "month": month, "year": year}, function (err, doc) {
			if (err) {
				callback(null);
			} else {
				callback(doc);
			}
		});
	},
	getAllActivityCounts: function (type, entity, callback) {
		var collection = db.collection('descriptive');
		collection.find({'type': type, 'entity': entity}).sort({year: 1, month: 1}).toArray(function (err, docs) {
			if (err) {
				callback(null);
			}
			else {
				/*docs.forEach(function (d) {
					console.log(d)
				});*/
				callback(docs);
			}
		});
	},
	getAllPostCountsFor: function(pageId, entity, callback) {
		var collection = db.collection('descriptive');
		collection.find({'type': "post_count", 'entity': entity, "page": pageId}).sort({year: 1, month: 1}).toArray(function (err, docs) {
			if (err) {
				callback(null);
			}
			else {
				callback(docs);
			}
		});
	}
}