// Controller takes route requests, calls functions within the models, which utilize SQL commands from the ORM.
// Import MySQL connection.
const connection = require("./connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
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

// Object for all our SQL statement functions.
let orm = {
  all: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {

      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function (table, condition, cb) {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // userAll: function(table, user, condition, cb) {
  //   let queryString = "SELECT * FROM " + table + " where ?;";
  //   connection.query(queryString, function(err, result) {
  //     if (err) {
  //       throw err;
  //     }
  //     cb(result);
  //   });
  // },
  selectWhere: function (tableInput, colToSearch, valOfCol) {
    return new Promise((resolve, reject) => {
      let queryString = "SELECT * FROM ?? WHERE ?? = ?";
      connection.query(queryString, [tableInput, colToSearch, valOfCol], function (err, result) {
        if (err) throw err;
        resolve(result);
      });
    });
  },
  selectAllOnJoin: function (tableOne, tableTwo, tableOneForeignKey, tableTwoPrimaryKey, cb) {
    let queryString =
      `select distinct table1.*, table2.* from ?? table2
      inner join ?? table1 on table2.?? = table1.??`;
    connection.query(
      queryString,
      [tableOne, tableTwo, tableOneForeignKey, tableTwoPrimaryKey],
      function (err, result) {
        if (err) throw err;
        console.log(queryString);
        console.log(result);
        cb(result);
      }
    );
  },
  // selectAllOnJoinWhere: function (tableOne, tableTwo, tableOneForeignKey, tableTwoPrimaryKey, condition, cb) {
  //   let queryString =
  //     `select distinct table1.*, table2.* from ?? table2
  //     inner join ?? table1 on table2.?? = table1.??
  //     where ?? = ?`;
  //     let aStringExample = `select distinct c.name from categories c 
  //     inner join expenses_budgeted b on b.category_id = c.id where b.user = ? ;`;
  //   connection.query(
  //     queryString,
  //     [tableOne, tableTwo, tableOneForeignKey, tableTwoPrimaryKey],
  //     function (err, result) {
  //       if (err) throw err;
  //       console.log(queryString);
  //       console.log(result);
  //       cb(result);
  //     }
  //   );
  // },
  selectAndOrder: function (whatToSelect, table, orderCol) {
    let queryString = "SELECT ?? FROM ?? ORDER BY ?? DESC";
    connection.query(queryString, [whatToSelect, table, orderCol], function (err, result) {
      if (err) throw err;
      console.log(queryString);
      result.forEach((element) => {
        console.log(element);
      });
    });
  },
  selectAllAndOrder: function (table, orderCol) {
    let queryString = "SELECT * FROM ?? ORDER BY ?? DESC";
    connection.query(queryString, [table, orderCol], function (err, result) {
      if (err) throw err;
      console.log(queryString);
      result.forEach((element) => {
        console.log(element);
      });
    });
  },
  userBudget: function (user, cb) {
    let queryString = `select distinct c.name from categories c 
    inner join expenses_budgeted b on b.category_id = c.id where b.user = ?;`;
    connection.query(queryString, [user], function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  userExpenses: function (user, cb) {
    let queryString = `
    select distinct e.amount, c.name from expenses_actual e
    inner join categories c on e.category_id = c.id
    where e.user = ?;`;
    connection.query(queryString, [user], function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
};

module.exports = orm;
