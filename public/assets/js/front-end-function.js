// Functions for On-clicks, routes, and page info linked from the main handlebar.

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

  let profileName = document.getElementById('userName');
  let profileIncome = document.getElementById('monthlyIncome');
  let profile = document.getElementById('createProfile');
  document.body.addEventListener('click', function (evt) {
    if (evt.target.className === 'profButtons text-heebo text-heebo mt-2 mb-2') {
      alert()
    }
  }, false);

  /*
  profile.addEventListener('click', function () {
    alert(profileName.value + profileIncome.value);
    console.log(profileName.value);

  });*/

  $("#createProfile").click(function () {
    console.log("Create Profile");

    var user = $("#userName").val();
    var data = { userName: user };
    var jsonData = JSON.stringify(data);
    $.ajax({

      url: "http://localhost:8080/api/add/user",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: jsonData,
      dataType: "json",
      success: function (data) {
        console.log(data);
      },
      error: function (error) {
        console.log(error);
      }
    });
  });

  $(".profBudget").click(function () {
    console.log("Open Profile Budget");
  });

  var expenses = [];
  var selectedCategory = "";

  $('#selectCategory').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    selectedCategory = this.value;
    console.log("new category: " + selectedCategory);
  });

  $('#saveExpense').click(function () {
    var expenseVal = $("#expense").val();
    var newCategory = {
      category: selectedCategory,
      expense: expenseVal
    };
    console.log(newCategory);
    expenses.push(newCategory);
    console.log(expenses);
  });

  $('#submitExpenses').click(function () {
    var jsonData = JSON.stringify(expenses);

    $.ajax({
      url: "http://localhost:8080/api/add/expenses",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: jsonData,
      dataType: "json",
      success: function (data) {
        console.log(data);
      },
      error: function (error) {
        console.log(error);
      }
    });
  });
});
