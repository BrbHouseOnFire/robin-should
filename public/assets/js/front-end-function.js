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
  $("#buttonZone").on("click", ".catButton", function() {
    console.log(this.value);
    let newCategory = {
      category_id: this.value,
      user: userName,
      amount: 0
    };
    let jsonData = JSON.stringify(newCategory);
    $.ajax({
      url: "/api/add/budget", //budget.create
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: jsonData,
      dataType: "json",
      success: function(data) {
        console.log(data);
        location.reload()
      },
      error: function(error) {
        console.log(error);
      }
    });
    ;
  })
  $("#deleteZone").on("click", ".catButton", function() {
    // console.log(this.value);
    let deleteMe = {
      id: this.value,
      user: userName
    };
    let url = "/api/budget/" + this.value;
    let jsonData = JSON.stringify(deleteMe);
    $.ajax({
      url: url,
      type: "DELETE",
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
    location.reload();
  })

  // ------ ON CLICK TO SECOND BUDGET PAGE ------ //
  $("#confirmCategories").on("click", "#budgetSave", function() {
    window.location.href = `/budget/set/2/${userName}`;
  })


  // ------ ON CLICK TO SAVE BUDGET ------ //
  $("#saveBudget").on("click", "#saveButton", function() {
    window.location.href = `/budget/expenses/${userName}`;
  })

    // ------ ON CLICK TO SAVE EXPENSES ------ //
  $("#confirmExpenses").on("click", "#expenseSave", function() {
    window.location.href = `/lifestyle/1/${userName}`;
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
  });




  // ------ UPDATE BUDGET ------ //
  $(".expenseContainer").on("click", ".submitExpense", function(event) {
    event.preventDefault();
    // console.log("hellwo"
    let catID = this.id;
    let expenseVal = $(`#${catID}`).prev().val();
    // $(`#${catID}`).parent().val();
    // console.log()
    console.log($(`#${catID}`).prev().val());

    let newCategory = {
      category_id: catID,
      user: userName,
      amount: expenseVal
    };
    let jsonData = JSON.stringify(newCategory);
    $.ajax({
      url: `/api/budget/${catID}`,
      type: "PUT",
      contentType: "application/json; charset=utf-8",
      data: jsonData,
      dataType: "json",
      success: function(data) {
        console.log(data);
        location.reload();
      },
      error: function(error) {
        console.log(error);
      }
    })
  });



 // ------ SAVE EXPENSES ------ //
  $("#saveExpense").click(function() {
    // console.log("checkecafj");
    let expenseVal = $("#expenseAmount").val();
    console.log(expenseVal);
    let expenseCat = $("#exCategory").val();
    let newCategory = {
      category_id: expenseCat,
      user: userName,
      amount: expenseVal
    };
    let jsonData = JSON.stringify(newCategory);
    $.ajax({
      url: "/api/add/expense",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: jsonData,
      dataType: "json",
      success: function(data) {
        console.log(data);
        location.reload();
      },
      error: function(error) {
        console.log(error);
      }
    });

  });

});



// $(function() {
//   let profileName = document.getElementById("userName");
//   let profileIncome = document.getElementById("monthlyIncome");
//   let profile = document.getElementById("createProfile");
//   document.body.addEventListener("click", function(evt) {
//       if (evt.target.className === "profButtons text-heebo text-heebo mt-2 mb-2") {
//         alert();
//       }
//   });

//   /*
//   profile.addEventListener('click', function () {
//     alert(profileName.value + profileIncome.value);
//     console.log(profileName.value);

//   });*/

//   // $("#home").click(function() {
//   //   window.location.href = "/lifestyle/1/:username";
//   // });

//   // $("#budget").click(function() {
//   //   window.location.href = "/budget/set/1/:username";
//   // });

//   // $("#expenses").click(function() {
//   //   window.location.href = "/budget/expenses/:username";
//   // });




//   var selectedCategory = "";

//   $("#selectCategory").on("change", function(e) {
//     var optionSelected = $("option:selected", this);
//     selectedCategory = this.value;
//     console.log("new category: " + selectedCategory);
//   });

//   $("#submitExpenses").click(function() {
//     var expenseVal = $("#expense").val();
//     var userName = $("#userName").text();
//     var newCategory = {
//       category_id: selectedCategory,
//       user: userName,
//       amount: expenseVal
//     };
//     console.log(newCategory);

//     var jsonData = JSON.stringify(newCategory);

//     $.ajax({
//       url: "api/add/expense",
//       type: "POST",
//       contentType: "application/json; charset=utf-8",
//       data: jsonData,
//       dataType: "json",
//       success: function(data) {
//         console.log(data);
//       },
//       error: function(error) {
//         console.log(error);
//       }
//     });
//   });
// });
