// Functions for On-clicks, routes, and page info linked from the main handlebar.
//let path = require("path");
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function(){

// ------ HTML PATH TRIMMING TO LEAVE ONLY THE CURRENT USERNAME ------ //
  let htmlPath = window.location.href;
  let userName = htmlPath.substring(htmlPath.lastIndexOf('/') + 1);
  // ------ HTML PATH TRIMMING TO LEAVE ONLY THE CURRENT USERNAME ------ //


  // ------ NAV BAR ON CLICKS ------ //
  $("#home").click(function() {
    window.location.href = `/lifestyle/1/${userName}`;
    console.log("home");
  })

  $("#budget").click(function() {
    window.location.href = `/budget/set/1/${userName}`;
  })

  $("#expenses").click(function() {
    window.location.href = `/budget/expenses/${userName}`;
  })


  // ------ FIRST BUDGET PAGE ------ //
  $(".catButton").on("click", "#buttonZone", function() {
    console.log(this);
  })
  // $(".catButton").click(function() {
  //   console.log(this);
  // })

  // ------ ON CLICK TO SECOND BUDGET PAGE ------ //
  $("#confirmCategories").on("click", "#budgetSave", function() {
    window.location.href = `/budget/set/2/${userName}`;
  })


  // ------ ON CLICK TO SAVE BUDGET ------ //
  $("#saveBudget").on("click", "#saveButton", function() {
    window.location.href = `/budget/expenses/${userName}`;
  })


    // ------ CREATE NEW PROFILE ------ //
  $("#createProfile").click(function() {
    console.log("Create Profile");

    let user = $("#userName").val();
    let amount = $("#monthlyIncome").val();
    let data = { userName: user, amount: amount };
    let jsonData = JSON.stringify(data);
    $.ajax({
      url: "/api/add/user",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: jsonData,
      dataType: "json",
      success: function(data) {
        console.log(data);
        },
      error: function(error) {
        console.log(error);
        }
    });
    window.location.href = `/budget/set/1/${user}`;
  });


    // ------ ALREADY CREATED PROFILES ------ //
  $(this).on("click", "#profile", function() {
    let returnUser = $(this).text();
    window.location.href = `/lifestyle/1/${returnUser}`;
    console.log(returnUser);
  })
});








