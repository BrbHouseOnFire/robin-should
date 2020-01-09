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
const category = require("../models/categories.js")

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

// router for displaying a page specific to the user
router.get("/input/:username", function (req, res) {
  // grab the username from the URL
  let username = req.params.username;
  // display the input page for the specified user
  res.render("inputPage1", username);
});

// router for displaying a page specific to the user
router.get("/results/1/:username", function (req, res) {
  // grab the username from the URL
  let username = req.params.username;
  // display the results page for the specified user
  res.render("resultsPage1", username);
});
// router for displaying a page specific to the user
router.get("/results/2/:username", function (req, res) {
  // grab the username from the URL
  let username = req.params.username;
  // display the results page for the specified user
  res.render("resultsPage2", username);
});


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


// creates a new user.
router.post("/api/add/user", function (req, res) {
  user.create(
    [
      "username" //, "otherColumn"
    ],
    [
      req.body.username//, req.body.otherColumn
    ],
    function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});

// router for updating. Likely not needed for this project.
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
