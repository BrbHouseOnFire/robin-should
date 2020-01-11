// Controller takes route requests, 
// calls functions within the models, 
// which utilize SQL commands from the ORM.



// PROCESS FLOW FOR A BRAND NEW USER
// LANDING PAGE -> Add New User button (moves directly to 'Set Budget' page). (Pulls username from form, calls function which makes Get request with :username)
// Moves to SET BUDGET PAGE
// SET BUDGET CATEGORIES PAGE -> (sql pull existing categories)
//    - Section 1: allows user to create categories (sql insert) or view pre-existing categories. (CANNOT DELETE CATEGORIES FROM DATABASE. THIS WOULD BE SCARY AND HARD DOWN THE WATERFALL.)
//      - allows user to select categories from the list of created/pre-existing categories to ADD them to section 2.
//    - Section 2: List of ADDed categories for the user's budget. Can hit 'Remove' on each category.
//    -> Click 'Submit' button (sql update/insert and move to new page) or 'Return to Homepage' button.
// SET BUDGET AMOUNTS PAGE -> (pull existing budget)
//    - Can add $ amount to the categories or edit the $ amount on chosen categories.
//    -> Click 'Submit' button (sql update/insert) or 'Go Back' button.
// VIEW/SUBMIT EXPENSES PAGE -> 
//    - Section 1: Form to add an expense with a dropdown for categories in their current budget.
//    -> Section 1.5: Click 'Submit' Button (sql update/insert) or 'Go Back' button.
//    - Section 2: A list of expenses (Future enhancement: only those associated with their current budget). Each have a delete button.
//    (Future Enhancement) - Section 3: A list of expenses NOT associated with a budget category. Each have a delete button. (IE: You used this category previously, but removed it from your budget.)
// After submission, moves to the sexy viewing pages where you can see all your lack of money and how you're broke as heyyyyllll.
// SEXY VIEWING PAGES: Nothing to click except maybe: 'Go to next page' or 'go back' or a special nav to switch between pages.


const express = require("express");

const router = express.Router();

// Import the models to use their database functions.
const user = require("../models/user.js");
const category = require("../models/categories.js");
const expense = require("../models/expenses.js");

// Create all our routes and set up logic within those routes where required.
// default landing page
router.get("/", function (req, res) {
  user.all(function (data) {
    let hbsObject = {
      user: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// EXPENSES PAGE
router.get("/expenses", function (req, res) {
  expense.all(function (data) {
    let expensesObj = {
      expenses: data
    };
    /*
      use {{fieldname}} to pass the dynamic data into the html template
    */
    console.log(expensesObj);
    res.render("expenses", expensesObj);

  });
});

// SET BUDGET CATEGORIES PAGE
router.get("/budget/set/1/:username", (req, res) => {
  // pull all current budget categories
  let username = req.params.username;
  console.log("route: /budget/set/1/" + username);
  category.all((data) => {
    let categoryObj = {
      category: data
    };
    console.log(categoryObj);
    category.userBudget(username, function (data) {
      let budgetCategories = {
        userCategory: data
      };
      console.log(budgetCategories);
      let fullObj = {
        fullCategoryList: categoryObj,
        userCategoryList: budgetCategories,
        user: username
      };
      console.log(fullObj);
      // categoryObj.personName = username;
      // render page with passed in budget categories
      res.render("budgetpage1", fullObj);
    });
  });
  
  
});
// SET BUDGET AMOUNTS PAGE
router.get("/budget/set/2", (req, res) => {
  // pull all current budget categories
  category.userBudget((data) => {
    let object = {
      category: data
    };
    console.log(object);
    // render page with passed in budget categories
    res.render("/", object);
  });
});
// VIEW/SUBMIT EXPENSES PAGE
router.get("/budget/expenses", (req, res) => {
  // pull all current budget categories
  category.userBudget((data) => {
    let categoryObject = {
      category: data
    };
    console.log(categoryObject);
    expense.all((data) => {
      let expenseObject = {
        expense: data
      };
      // render page with passed in budget categories and expenses
      res.render("budgetpage1", categoryObject, expenseObject);
    });
  });
});
// SEXY RESULT PAGES
// router.get("")

// create a new category
router.post("/api/add/category", function (req, res) {
  category.create(
    [
      "name" //, "otherColumn"
    ],
    [
      req.body.name//, req.body.otherColumn
    ],
    function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});

router.post("/api/add/expenses", function (req, res) {
  console.log(req.body);
  // Add new user expenses
  var userExpenses = req.body;
  expense.create(
    ["user", "amount", "category_id"],
    [userExpenses.user, userExpenses.amount, userExpenses.category_id],
    function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });


  /*
  category.create(
    [
      "name" //, "otherColumn"
    ],
    [
      req.body.name//, req.body.otherColumn
    ],
    function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });*/
});


// creates a new user.
router.post("/api/add/user", function (req, res) {
  console.log("/api/add/user");
  console.log(req.body);
  user.create(
    [
      "username" //, "otherColumn"
    ],
    [
      req.body.userName//, req.body.otherColumn
    ],
    function (result) {
      // Send back the ID of the new user
      res.json({ id: result.insertId });
    });
});

// // router for displaying a page specific to the user
// router.get("/input/:username", function (req, res) {
//   // grab the username from the URL
//   let username = req.params.username;
//   // display the input page for the specified user
//   res.render("inputPage1", username);
// });

// // router for displaying a page specific to the user
// router.get("/results/1/:username", function (req, res) {
//   // grab the username from the URL
//   let username = req.params.username;
//   // display the results page for the specified user
//   res.render("resultsPage1", username);
// });
// // router for displaying a page specific to the user
// router.get("/results/2/:username", function (req, res) {
//   // grab the username from the URL
//   let username = req.params.username;
//   // display the results page for the specified user
//   res.render("resultsPage2", username);
// });


// a mock router for testing purposes
router.get("/api/test/:valueone/:valuetwo/:valuethree", (req, res) => {
  let val1 = req.params.valueone;
  let val2 = req.params.valuetwo;
  let val3 = req.params.valuethree;
  console.log(val1);
  console.log(val2);
  console.log(val3);
  expense.all((data) => {
    return res.json(data);
  });
});
// api route to pull list of users
router.get("/api/users", (req, res) => {
  user.all((data) => {
    return res.json(data);
  });
});


// router for updating a user. Likely not needed for this project.
router.put("/api/users/:id", function (req, res) {
  // let condition = "id = " + req.params.id;

  // console.log("condition", condition);

  // user.update({
  //   sleepy: req.body.sleepy
  // }, condition, function(result) {
  //   if (result.changedRows == 0) {
  //     // If no rows were changed, then the ID must not exist, so 404
  //     return res.status(404).end();
  //   } else {
  //     res.status(200).end();
  //   }
  // });
});
// delete a user by ID, probably not needed.
router.delete("/api/users/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  user.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
