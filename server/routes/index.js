var express = require('express');
var router = express.Router();
var insert = require('../insert');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/chatDB";
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '411519',
  key: 'e2e9213efa7b26524a54',
  secret: 'ffcbb2838ee0fa645ed1',
  cluster: 'ap2',
  encrypted: true
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('works');
});

router.post('/insert', function(req, res, next) {
	var data = {
		user: req.body.user,
		text: req.body.text 
	};
	insert.add(data);
});

router.get('/get', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	    db.collection("chat").find().toArray(function(err, result) {
    if (err) throw err;
     res.json(result);
    db.close();
  });
	}); 
});

router.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});


module.exports = router;
