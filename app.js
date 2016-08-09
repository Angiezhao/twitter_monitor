var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();      
}); 

//use NYtweets.js
app.use('/', require('./nytweets'));

app.listen(5000, function() {
    console.log('Listening on port 5000');
});

