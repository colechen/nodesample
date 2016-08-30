var express = require('express');
var app = express();

//app.use(express.static('public'));
//app.use('/static',express.static('public'));
app.use('/static', express.static(__dirname + '/public'));


app.get('/',function(req, res){
    res.send("Hello World");
});

//Ignore request method
//In the following example, the handler will be executed for requests to “/secret”
//whether you are using GET, POST, PUT, DELETE, or any other HTTP request method that is supported in the http module.
app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...');
    next(); // pass control to the next handler
});

//Single Static File
//If you have a specific file, use the res.sendFile() function.
//If you are serving many assets from a directory, use the express.static() middleware function.
app.get('/plainHtml', function(req, res){
    res.sendFile(__dirname+'/plainHtml.html');
});



//Route Parameters
//The name of route parameters must be made up of “word characters” ([A-Za-z0-9_]).
//Route path: /users/:userId/books/:bookId
//Request URL: http://localhost:3000/users/34/books/8989
//req.params: { "userId": "34", "bookId": "8989" }
app.get('/users/:userId/books/:bookId', function(req, res) {
    res.send(req.params);
});

//Special Route Parameters
//Route path: /flights/:from-:to
//Request URL: http://localhost:3000/flights/LAX-SFO
//req.params: { "from": "LAX", "to": "SFO" }
app.get('/flights/:from-:to', function(req, res){
    res.send(req.params);
});
//Route path: /plantae/:genus.:species
//Request URL: http://localhost:3000/plantae/Prunus.persica
//req.params: { "genus": "Prunus", "species": "persica" }
app.get('/plantae/:genus.:species', function(req, res){
    res.send(req.params);
});




//More than one callback function
app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from B!');
});

//A combination of independent functions and arrays of functions can handle a route
var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
}
var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
}
app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from D!');
});

//Chained route handlers
app.route('/book')
    .get(function(req, res) {
        res.send('Get a random book');
    })
    .post(function(req, res) {
        res.send('Add a book');
    })
    .put(function(req, res) {
        res.send('Update the book');
    });

//The following example creates a router as a module, loads a middleware function in it,
//defines some routes, and mounts the router module on a path in the main app.
//Example: The app will now be able to handle requests to /birds and /birds/about,
//as well as call the timeLog middleware function that is specific to the route.
var birds = require('./birds');
app.use('/birds', birds);


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
