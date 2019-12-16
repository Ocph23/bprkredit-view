
const port = process.env.PORT || 3000;
var express = require('express');
var app = express();

app.use(express.static('/'));

//Serves all the request which includes /images in the url from Images folder
app.use('/', express.static(__dirname ));

var server = app.listen(port);