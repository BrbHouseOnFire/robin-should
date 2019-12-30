// Functions for On-clicks, routes, and page info linked from the main handlebar.

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // $(".change-sleep").on("click", function(event) {
  //   var id = $(this).data("id");
  //   var newSleep = $(this).data("newsleep");

  //   var newSleepState = {
  //     sleepy: newSleep
  //   };

  //   // Send the PUT request.
  //   $.ajax("/api/burgers/" + id, {
  //     type: "PUT",
  //     data: newSleepState
  //   }).then(
  //     function() {
  //       console.log("changed sleep to", newSleep);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });

  // $(".create-form").on("submit", function(event) {
  //   // Make sure to preventDefault on a submit event.
  //   event.preventDefault();

  //   var newburger = {
  //     name: $("#ca").val().trim(),
  //     sleepy: 0
  //   };

  //   // Send the POST request.
  //   $.ajax("/api/burgers", {
  //     type: "POST",
  //     data: newburger
  //   }).then(
  //     function() {
  //       console.log("created new burger");
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });

  // $(".delete-burger").on("click", function(event) {
  //   var id = $(this).data("id");

  //   // Send the DELETE request.
  //   $.ajax("/api/burgers/" + id, {
  //     type: "DELETE"
  //   }).then(
  //     function() {
  //       console.log("deleted burger", id);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });
});
