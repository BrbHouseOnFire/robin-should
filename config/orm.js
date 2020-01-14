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
    let queryString = `select distinct c.name, b.id, b.amount from categories c 
    inner join expenses_budgeted b on b.category_id = c.id where b.user = ?;`;
    connection.query(queryString, [user], function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  userExpenses: function (user, cb) {
    let queryString = `
    select distinct e.amount, c.name, c.id from expenses_actual e
    inner join categories c on e.category_id = c.id
    where e.user = ?;`;
    let queryString2 = `select distinct name, id from expenses_budgeted where user = ? ;`;
    // grab expenses
    connection.query(queryString, [user], function (err, result) {
      if (err) throw err;
      let expenses = result;
      // console.log(expenses);
      // grab budget categories
      connection.query(queryString2, [user], function (err, result) {
        if (err) throw err;
        let categories = result;
        // console.log(categories);

        let finalObj = {
          expenses: expenses,
          categories: categories
        }
        console.log(finalObj);
        cb(finalObj);
      });
      // cb(result);
    });
  },
  testPromiseKey: function (tableInput, colToSearch, valOfCol) {
    return new Promise((resolve, reject) => {
      let queryString = "SELECT * FROM ?? WHERE ?? = ?";
      connection.query(queryString, [tableInput, colToSearch, valOfCol], function (err, result) {
        if (err) throw err;
        resolve(result);
      });
    });
  },
  getUserResults1: function (user, cb) {
    let totalSpentQuery = `select * from expenses_actual where user = ? ;`;
    let expensesActual = {};
    let totalBudgetQuery = `select * from expenses_budgeted where user = ? ;`;
    let expensesBudgeted = {};
    let earningsQuery = `select amount from income where user = ? ;`;
    let income;
    let resultObj ={};

    // pull all from expenses_actual for the user
    connection.query(totalSpentQuery, [user], function (err, result) {
      if (err) throw err;
      expensesActual = result;

      // pull all from expenses_budgeted for the user
      connection.query(totalBudgetQuery, [user], function (err, result2) {
        if (err) throw err;
        expensesBudgeted = result2;

        // pull amount from income for the user
        connection.query(earningsQuery, [user], function (err, result3) {
          if (err) throw err;
          income = result3[0].amount;
          let categoryArr = [];
          let index = 0;


          // total spent
          let totalSpent = 0;
            // Sum of expenses_actual for user
          expensesActual.forEach(element => {
            totalSpent += element.amount;
          });
          // total budget
          let totalBudget = 0;
            // Sum of amounts in expenses_budgeted for user
          expensesBudgeted.forEach(element => {
            totalBudget += element.amount;
          });
          // excess budget unspent
            // math sum(budget category - sum(expenses in the category) where val > 0)
          let excessBudget = 0;
          // excess expenses
            // math sum(budget category - sum(expenses in the category) where val < 0)
          let excessExpenses = 0;

          expensesBudgeted.forEach(category => {
            // hold the current amount of expenditures for this budget category
            let thisExpenseSum = 0;
            // console.log("category.category_id")
            // console.log(category.category_id)
            expensesActual.forEach(exp => {
              // if the expense is in this category
              // console.log("exp.category_id")
              // console.log(exp.category_id)
              if (category.category_id === exp.category_id) {
                // add the expense to the total for this category
                thisExpenseSum += exp.amount;
              }
            });
            // if the expenses exceed the budgeted amount for the category
            if (thisExpenseSum > category.amount) {
              // tally up the excess
              excessExpenses += (thisExpenseSum - category.amount);
            }
            // if the expenses are within the budget for the category
            else if (thisExpenseSum < category.amount) {
              // store this excess for the budget category
              excessBudget += (category.amount - thisExpenseSum);
            }
          });


          // net budget
            // math (excess budget - excess expenses)
          let netBudget = excessBudget - excessExpenses;
          // monthly earnings
            // pull from income table
          let monthlyEarnings = income;
          // expected savings
            // math (monthly earnings - total budget)
          let expectedSavings = monthlyEarnings - totalBudget;
          // actual savings
            // math (monthly earnings - expected savings + net budget)
          let actualSavings = monthlyEarnings - totalBudget  + netBudget;

          resultObj = {
            user: user,
            totalSpent: totalSpent,
            totalBudget: totalBudget,
            excessBudget: excessBudget,
            excessExpenses: excessExpenses,
            netBudget: netBudget,
            monthlyEarnings: monthlyEarnings,
            expectedSavings: expectedSavings,
            actualSavings: actualSavings




          };
          console.log("userResults: ");
          console.log(resultObj);
          console.log("----------");

          cb(resultObj);
        });
      });
    });



  },
};

module.exports = orm;
