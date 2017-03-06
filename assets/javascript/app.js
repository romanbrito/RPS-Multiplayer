// Initialize Firebase
var database = firebase.database();
var name1 = null;
var name2 = null;

var playerOptions = ["Rock", "Paper", "Scissors"];

// At the initial load, get a snapshot of the current data.
database.ref().on("value", function(snapshot) {

  // If Firebase has a player (first case)
  if (snapshot.child("player1Name").exists()) {

    // Set the initial variables for player1

    name1 = snapshot.val().player1Name;
    renderButtons(1);

    // Change the HTML to reflect the initial value
    $("#player1 p").html("player 1 name " + name1);

    // Print the initial data to the console.

  }

  // Keep the initial variables
  else {

    // Change the HTML to reflect the initial value


    // Print the initial data to the console.



  }

  // If Firebase has a player2
  if (snapshot.child("player2Name").exists()) {

    // Set the initial variables for player1

    name2 = snapshot.val().player2Name;

    // Change the HTML to reflect the initial value
    $("#player2 p").html("player 2 name " + name2);
    renderButtons(2);

    // Print the initial data to the console.

  }

  // Keep the initial variables
  else {

    // Change the HTML to reflect the initial value


    // Print the initial data to the console.



  }

// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#submit-name").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();
    if (name1) {
        name2 = $("#name").val().trim();
        $("#player2 p").html("player 2 name " + name2);
    } else {
        name1 = $("#name").val().trim();
        $("#player1 p").html("player 1 name " + name1);
    }
    // Save the new info in Firebase
    database.ref().set({
        player1Name: name1,
        player2Name: name2
    });
});

$(document).on("click", ".attackOptions", function () {
    var dataIndex = $(this).attr("data-index");
    console.log(dataIndex);
});
