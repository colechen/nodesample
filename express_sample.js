var express = require('express');
var app = express();

//app.use(express.static('public'));
//app.use('/static',express.static('public'));
app.use('/static', express.static(__dirname + '/public'));


app.get('/',function(req, res){
    res.send("Hello World");
});

//Single Static File
//If you have a specific file, use the res.sendFile() function.
//If you are serving many assets from a directory, use the express.static() middleware function.
app.get('/plainHtml', function(req, res){
    res.sendFile(__dirname+'/plainHtml.html');
});

//Handle 404 Response
//In Express, 404 responses are not the result of an error, so the error-handler middleware will not capture them.
//This behavior is because a 404 response simply indicates the absence of additional work to do; in other words,
//Express has executed all middleware functions and routes, and found that none of them responded.
//All you need to do is add a middleware function at the very bottom of the stack (below all other functions) to
//handle a 404 response
app.use(function(req, res, next){
    res.status(404).send('Sorry, page not found');
});

//Error Handler
//You define error-handling middleware in the same way as other middleware, except with four arguments instead of three;
//specifically with the signature (err, req, res, next):
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
    console.log(__dirname);
});
