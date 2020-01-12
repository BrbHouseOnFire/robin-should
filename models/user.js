// Controller takes route requests, calls functions within the models, which utilize SQL commands from the ORM.
// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

let user = {
  all: function(cb) {
    orm.all("users", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("users", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("users", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("users", condition, function(res) {
      cb(res);
    });
  },
  // grab all categories from expenses_budgeted for the user
  // budget: function(username, cb) {
  //   orm.selectWhere("expenses_budgeted", "user", username, function(res) {
  //     cb(res);
  //   });
  // },
  getResults: function(username, cb) {
    orm.getUserResults1(username, (res) => {
      // console.log("orm.getUserResults res:");
      // console.log(res)
      // console.log("----------");
      cb(res);
    });
  },
  expenses: function(username, cb) {
    orm.userExpenses(username, function(res) {
      cb(res);
    });
  },
  // delete a budget category for the user
  deleteBudgetCategory: function(user, categoryid, cb) {
    let condition = 'where user = ' + user + 'and category_id = ' + categoryid;
    orm.delete("expenses_budgeted", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (usersController.js).
module.exports = user;
