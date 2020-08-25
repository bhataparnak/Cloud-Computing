const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const mysqlConnection = require("./connection");
const PeopleRoutes = require("./routes/profile");
var path = require("path");


var app = express();
app.use(bodyparser.json());
app.use(express.static('./routes'));
app.use("/profile", PeopleRoutes);


app.listen(8080);