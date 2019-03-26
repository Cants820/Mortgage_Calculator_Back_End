var express = require("express"); //to quickly setup a server, I have chosen express
var bodyParser = require("body-parser");  // this is a npm that easily parses data. When requesting when over to the server

var app = express(); //


var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


var routes = require('./app/routing/routes.js');
routes(app);



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
