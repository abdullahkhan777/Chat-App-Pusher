var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/chatDB";

module.exports = {
  add: function (data) {
      MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var myobj = { user: data.user, text: data.text };

	  db.collection("chat").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 chat document inserted ---");
	    db.close();
	  });
	});
  }
};
