// Controller takes route requests, calls functions within the models, which utilize SQL commands from the ORM.
// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

let category = {
  all: function(cb) {
    orm.all("categories", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("categories", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("categories", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("categories", condition, function(res) {
      cb(res);
    });
  },
  // grab all categories from expenses_budgeted for the user
  userBudget: function(user, cb) {
    orm.selectWhere("expenses_actual", "user", user, function(res) {
      cb(res);
    });
  },
  // delete a budget category for the user
  deleteBudgetCategory: function(user, categoryid, cb) {
    // the condition passed in should be string for the actual condition
    let condition = 'where user = ' + user + 'and category_id = ' + categoryid;
    orm.delete("expenses_actual", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (categoryController.js).
module.exports = category;
