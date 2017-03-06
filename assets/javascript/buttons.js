var attackOptions = ["Rock", "Paper", "Scissors"];
// Function for displaying attack options

function renderButtons(playerNumber) {

  // Deleting the topics prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
    playerButtonView = $("#player" + playerNumber + " .buttons-view");
    playerButtonView.empty();

  // Looping through the array of attackOptions
  for (var i = 0; i < attackOptions.length; i++) {

    // Then dynamicaly generating buttons for each topic in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of topic to our button
    a.addClass("attackOptions btn btn-primary");
    // Adding a data-attribute
    a.attr("data-index", "player num " + playerNumber + " " + attackOptions[i]);
    // Providing the initial button text
    a.text(attackOptions[i]);
    // Adding the button to the buttons-view div
    playerButtonView.append(a);
  }
}
