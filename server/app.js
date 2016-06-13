var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var collection = require('./routes/collection');
var wishlist = require('./routes/wishlist');
var search = require('./routes/search');
//var mongoose = require('mongoose');



//middleware
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use('/collection', collection);
app.use('/wishlist', wishlist);
app.use('/search', search);

// // mongoose connection
// var databaseURI = 'mongodb://localhost:27017/mu';
//
// mongoose.connect(databaseURI);
//
// mongoose.connection.on('connected', function () {
//   console.log('Mongoose connection open ', databaseURI);
// });
//
// mongoose.connection.on('error', function (err) {
//   console.log('Mongoose error connecting ', err);
// });

// start server
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('listening on port ', app.get('port'));
});

// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});
