require("dotenv").config();
var express = require("express");

var PORT = process.env.PORT || 6174;

var app = express();

var db = require("./models");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

require("./controllers/burgers_controller.js")(app);

var syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
    });
});

module.exports = app;
