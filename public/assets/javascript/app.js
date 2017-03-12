// Initialize Firebase
var database = firebase.database();

var players = [];
const NumOfPlayers = 2;
var turn = 0;

// At initial load, get a snapshot of the current data
database.ref().on("value", function(snapshot) {
    if (snapshot.child("players").exists()) {
        players = snapshot.val().players;
        turn = snapshot.val().turn;
    } else {

    }

    for (var i = 0; i < players.length; i++) {
        playerNameView = $("#player" + (i + 1) + " p");
        playerNameView.html(players[i].name);
        playerNameView.append(" Wins: " + players[i].wins);
        playerNameView.append(" Losses: " + players[i].losses);
    }

    // If any errors are experienced, log them to console.
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// -------
$("#submit-name").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();
    turn++;

    if (players.length < NumOfPlayers) {
        var playerName = $("#name").val().trim();
        players.push({
            name: playerName,
            losses: 0,
            wins: 0,
            choice: null
        });
        $("#row2").html("Hi " + playerName + "! You are Player " + players.length + "<br> It's your turn");

        renderButtons(players.length);

        // Save the new info in Firebase
        database.ref().set({
            players,
            turn
        });
        console.log(players);
    }
});

// click buttons
$(document).on("click", ".attackOptions", function() {

    var dataPlayer = $(this).attr("data-player");
    var attackPlayer = $(this).html();

    var playerButtonView = $("#" + dataPlayer + " .buttons-view");
    playerButtonView.text(attackPlayer);
    console.log(attackPlayer);
    console.log(dataPlayer);
    players[turn-1].choice = attackPlayer;

    database.ref().set({
        players,
        turn
    });

});
