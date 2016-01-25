var Clarifai = require('./clarifai_node.js');
var express = require('express');
var app = express();
var imgurl="https://www.petfinder.com/wp-content/uploads/2012/11/dog-how-to-select-your-new-best-friend-thinkstock99062463.jpg";
Clarifai.initAPI('LqwpKKRa-DPO_oCzw7v0FWR25Isg2I2LXPTnNf9S', 'thKbQy5rhUdICsV3QKIQEVQGaVKzjfsnvlahe2H9T');

//cassandra db driver
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log( "we're connected!")
});

function postImage(imgurl) {
    var data = {
      'url': imgurl
    };
    var accessToken = db.getItem('accessToken');

    return $.ajax({
      'url': 'https://api.clarifai.com/v1/tag',
      'headers': {
        'Authorization': 'Bearer ' + accessToken
      },
      'data': data,
      'type': 'POST'
    }).then(function(r) {
    	db.setItem('tagResponse', r);
    	console.log(r);
    });
  }


app.get('/', function(req, res) {
    //res.render('index.html');
    postImage(imgurl);


    res.write("hello world");
    res.end();
});






app.listen(3000, function(){

	console.log("listening on port 3000");
});
