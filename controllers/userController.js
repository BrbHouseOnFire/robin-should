const express = require("express");

const router = express.Router();

// Import the model (user.js) to use its database functions.
const user = require("../models/user.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // user.all(function(data) {
  //   let hbsObject = {
  //     users: data
  //   };
  //   console.log(hbsObject);
  //   res.render("index", hbsObject);
  // });
  res.render("index");
});

// router for displaying a page specific to the user
router.get("/add1/:username", function(req, res) {
  // grab the username from the URL
  let username = req.params.username;
  // display the input page for the specified user
  res.render("inputPage1", username);
});

// router for displaying a page specific to the user
router.get("/results1/:username", function(req, res) {
  // grab the username from the URL
  let username = req.params.username;
  // display the input page for the specified user
  res.render("resultsPage1", username);
});





router.post("/api/users", function(req, res) {
  // user.create(
  //   [
  //     "name", "sleepy"
  //   ], 
  //   [
  //     req.body.name, req.body.sleepy
  //   ], 
  //   function(result) {
  //   // Send back the ID of the new quote
  //   res.json({ id: result.insertId });
  // });
});

// router for updating. Likely not needed for this project.
router.put("/api/users/:id", function(req, res) {
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

router.delete("/api/users/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  user.delete(condition, function(result) {
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
