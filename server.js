var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//parse application/x-www-formrlencoded
app.use(bodyParser.urlencoded({extended: false}));

//parse application/JSON
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/endpoint', function(req, res){
    var obj = {};
    console.log('body: ' + JSON.stringify(req.body));
    res.send(JSON.stringify(req.body, null, 2));
});

var server = app.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("example app listening at http://%s:%s", host, port);
});
