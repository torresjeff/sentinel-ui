var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/facebook'

var db = null;
MongoClient.connect(url, function (err, db_conn) {
	console.log("Connected successfully to Mongo server")
	db = db_conn;
});

var months =["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
/*var months = ["Enero/16", "Febrero/16", "Marzo/16", "Abril/16", "Mayo/16", "Junio/16", "Julio/16", "Agosto/16", "Septiembre/16",
	"Octubre/16", "Noviembre/16", "Diciembre/16", "Enero/17", "Febrero/17", "Marzo/17", "Abril/17", "Mayo/17", "Junio/17",
	"Julio/17", "Agosto/17", "Septiembre/17", "Octubre/17", "Noviembre/17", "Diciembre/17"];*/

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

module.exports = {
	getAllResults: function (callback) {
		var collection = db.collection('results');
		collection.find({}).toArray(function (err, docs) {
			if (err) {
				callback(null);
			}
			else {
				callback(docs);
			}
		});
	},
	getSentimentForLider: function (entity, callback) {
		var collection = db.collection('sentiment');
		collection.find({'lider': entity}).sort({'year': 1, 'month': 1}).toArray(function (err, doc) {
			if (err) {
				callback(null);
			}
			else {
				callback(doc);
			}
		});
	},
	getSentimentForType: function (type, callback) {
		var collection = db.collection('sentiment');
		collection.find({'type': type}).toArray(function (err, docs) {
			if (err) {
				callback(null);
			}
			else {
				console.log("docs: ",docs)
				callback(docs);
			}
		});
	},
	getCommentSummaryByMonthForEntity: function(entity, callback) {
		var collection = db.collection('results');
		collection.findOne({'_id': entity}, function (err, doc) {
			if (err) {
				callback(null);
			}
			else {
				var summary = {};
				var startDate = new Date("2016-01-01T23:59:59Z");
				var startYear = startDate.getFullYear();
				var startMonth = startDate.getMonth();
				console.log("startYear", startYear);
				console.log("startMonth", startMonth);
				var today = new Date();
				var todayYear = today.getFullYear();
				var todayMonth = today.getMonth();
				var todayDate = today.getDate();
				console.log("todayYear", todayYear);
				console.log("todayMonth", todayMonth);

				var yearDiff = todayYear - startYear;
				console.log("yearDiff", yearDiff);
				var monthLabels = [];
				var monthSummaries = [];
				for (var i = startYear; i < todayYear + 1; i++) {
					if (i == todayYear) {
						for (var j = 0; j < todayMonth + 1; j++) {
							monthLabels.push(months[j] + "/" + (todayYear % 2000).toString());
							
							var daysMonth = daysInMonth(i, j);
							var dateToLookFor = i.toString() + (j + 1 > 9 ? "-" : "-0") + (j+1).toString() + "-";

							var monthSummary = {
								"positive": 0,
								"neutral": 0,
								"negative": 0,
								"comment_id": "",
								"comment_most_likes": "",
								"like_count": 0,
								"month": i.toString() + (j + 1 > 9 ? "-" : "-0") + (j + 1).toString()
							};

							for (var k = 1; k <= daysMonth; k++) {
								var day = (k < 10 ? "0" + k.toString() : k.toString());
								//console.log("dateToLookFor", dateToLookFor + day);
								if (doc.comment_summary[dateToLookFor + day]) {
									//console.log("Found info for", dateToLookFor + day);
									monthSummary.positive += doc.comment_summary[dateToLookFor + day].positive;
									monthSummary.negative += doc.comment_summary[dateToLookFor + day].negative;
									monthSummary.neutral += doc.comment_summary[dateToLookFor + day].neutral;

									if (doc.comment_summary[dateToLookFor + day].like_count > monthSummary.like_count ||
											monthSummary.comment_id == "") {
										monthSummary.monthSummary = doc.comment_summary[dateToLookFor + day].monthSummary;
										monthSummary.like_count = doc.comment_summary[dateToLookFor + day].like_count;
										monthSummary.comment_most_likes = doc.comment_summary[dateToLookFor + day].comment_most_likes;
									}
								}


								//doc.comment_summary
							}
							//console.log("monthSummary", monthSummary);
							monthSummaries.push(monthSummary);
							//console.log("Days in month for", dateToLookFor + daysMonth);

						}
					}
					else {
						for (var j = 0; j < 12; j++) {
							monthLabels.push(months[j] + "/" + (i % 2000).toString());
							
							var daysMonth = daysInMonth(i, j);
							var dateToLookFor = i.toString() + (j + 1 > 9 ? "-" : "-0") + (j+1).toString() + "-";

							var monthSummary = {
								"positive": 0,
								"neutral": 0,
								"negative": 0,
								"comment_id": "",
								"comment_most_likes": "",
								"like_count": 0,
								"month": i.toString() + (j + 1 > 9 ? "-" : "-0") + (j + 1).toString()
							};

							for (var k = 1; k <= daysMonth; k++) {
								var day = (k < 10 ? "0" + k.toString() : k.toString());
								//console.log("dateToLookFor", dateToLookFor + day);
								if (doc.comment_summary[dateToLookFor + day]) {
									//console.log("Found info for", dateToLookFor + day);
									monthSummary.positive += doc.comment_summary[dateToLookFor + day].positive;
									monthSummary.negative += doc.comment_summary[dateToLookFor + day].negative;
									monthSummary.neutral += doc.comment_summary[dateToLookFor + day].neutral;

									if (doc.comment_summary[dateToLookFor + day].like_count > monthSummary.like_count ||
											monthSummary.comment_id == "") {
										monthSummary.monthSummary = doc.comment_summary[dateToLookFor + day].monthSummary;
										monthSummary.like_count = doc.comment_summary[dateToLookFor + day].like_count;
										monthSummary.comment_most_likes = doc.comment_summary[dateToLookFor + day].comment_most_likes;
									}
								}
							}
							//console.log("monthSummary", monthSummary);
							monthSummaries.push(monthSummary);
							//console.log("Days in month for", dateToLookFor + daysMonth);
						}
					}
				}

				callback({monthLabels: monthLabels, monthSummaries: monthSummaries});
			}
		});
	}
}