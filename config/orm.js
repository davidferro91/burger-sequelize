require("dotenv").config();
var connection = require("./connection.js");

function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
}


var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, [tableInput], function(err, result) {
            if (err) throw err;
            console.log(result);
            cb(result);
        });
    },
    insertOne: function(table, col, val, cb) {
        var queryString = "INSERT INTO " + table + " (" + col.toString() + ") VALUES (?);";
        connection.query(queryString, [val], function (err, result) {
            if (err) throw err;
            console.log(result);
            cb(result);
        });
    },
    updateOne: function(table, objColVal, condition, cb) {
        var queryString = "UPDATE " + table + " SET " + objToSql(objColVal) + " WHERE " + condition;
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            console.log(result);
            cb(result);
        });

    }
};

module.exports = orm;