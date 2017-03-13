var attackOptions = ["Rock", "Paper", "Scissors"];
// Function for displaying attack options

function renderButtons(playerNumber) {

  // Deleting the topics prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
    var playerButtonView = $("#player" + playerNumber + " .buttons-view");
    playerButtonView.empty();

  // Looping through the array of attackOptions
  for (var i = 0; i < attackOptions.length; i++) {

    // Then dynamicaly generating buttons for each topic in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of topic to our button
    a.addClass("attackOptions btn btn-primary");
    // Adding a data-attribute
    a.attr("data-player", "player" + playerNumber);
    // Providing the initial button text
    a.text(attackOptions[i]);
    // Adding the button to the buttons-view div
    playerButtonView.append(a);
  }
}

function clearButtons(playerNumber) {
  playerButtonView = $("#player" + playerNumber + " .buttons-view");
  playerButtonView.hide();
}

function showButtons(playerNumber) {
  playerButtonView = $("#player" + playerNumber + " .buttons-view");
  playerButtonView.show();
}

function renderInformation(player1Choice, player2Choice, player1Wins, player1Losses, player2Wins, player2Losses){
  $("#player1 .choice").html(player1Choice);
  $("#player2 .choice").html(player2Choice);
  $("#player1 .wins").html(" Wins: " + player1Wins);
  $("#player1 .losses").html(" Losses: " + player1Losses);
  $("#player2 .wins").html(" Wins: " + player2Wins);
  $("#player2 .losses").html(" Losses: " + player2Losses);
}
