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
	},
	getReactionsFor: function(pageId, year, month, callback) {
		var collection = db.collection('descriptive');
		collection.find({'type': "reaction_count", "page": pageId, "year": year, "month": month}).sort({year: 1, month: 1}).toArray(function (err, docs) {
			if (err) {
				callback(null);
			}
			else {
				callback(docs);
			}
		});
	},
	getCommentCountCorruption: function (entity, month, year, callback) {
		var collection = db.collection('descriptive');
		collection.find({'type': "comment_count", "year": year, "month": month}).sort({year: 1, month: 1}).toArray(function (err, docs) {
			if (err) {
				callback(null);
			}
			else {
				callback(docs);
			}
		});
	},
	getPopularPostsAndCommentsForDate: function (entity, specific, month, year, callback) {
		var collection = db.collection('descriptive');
		collection.find({'type': "popular", "year": year, "month": month, "entity": entity, "specific": specific}).sort({year: 1, month: 1}).toArray(function (err, docs) {
			if (err) {
				callback(null);
			}
			else {
				callback(docs);
			}
		});
	},
	getPopularPostsAndComments: function (entity, specific, callback) {
		var collection = db.collection('descriptive');
		collection.find({'type': "popular", "entity": entity, "specific": specific}).sort({year: 1, month: 1}).toArray(function (err, docs) {
			if (err) {
				callback(null);
			}
			else {
				callback(docs);
			}
		});
	}
}