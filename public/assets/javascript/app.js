// Initialize Firebase
var database = firebase.database();

database.ref().set({
    players: null,
    turn: null
});

var players = [];
const NumOfPlayers = 2;

// At initial load, get a snapshot of the current data
database.ref().on("value", function(snapshot) {
    var turn = 0;
    if (snapshot.child("players").exists()) {
        players = snapshot.val().players;
    } else {}

    for (var i = 0; i < players.length; i++) {
        var playerNameView = $("#player" + (i + 1) + " p");
        playerNameView.html(players[i].name);
        var playerInfoWins = $("#player" + (i + 1) + " .wins");
        playerInfoWins.html(" Wins: " + players[i].wins);
        var playerInfoLoss = $("#player" + (i + 1) + " .losses");
        playerInfoLoss.html(" Losses: " + players[i].losses);
    }
    // turn
    if (snapshot.child("turn").exists()) {
        turn = snapshot.val().turn;
    } else {}
    if (turn > 0) {
        showButtons(players.length);
    }
    if (turn > 1) {
        var result = rpsGame(players[0].choice, players[1].choice);
        if (result === -1) {
            $("#result").html("<h2> Tie </h2>");
            renderInformation(players[0].choice, players[1].choice, players[0].wins, players[0].losses, players[1].wins, players[1].losses);
        } else if (result) {
            $("#result").html("<h2>" + players[0].name + " won </h2>");
            players[0].wins += 1;
            players[1].losses += 1;
            renderInformation(players[0].choice, players[1].choice, players[0].wins, players[0].losses, players[1].wins, players[1].losses);
        } else {
            $("#result").html("<h2>" + players[1].name + " won </h2>");
            players[1].wins += 1;
            players[0].losses += 1;
            renderInformation(players[0].choice, players[1].choice, players[0].wins, players[0].losses, players[1].wins, players[1].losses);
        }
        for (var i = 0; i < players.length; i++) {
          renderButtons(i + 1); // next game
          console.log("players.length " + players.length);
        }
    }

    // If any errors are experienced, log them to console.
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// -------
$("#submit-name").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();

    if (players.length < NumOfPlayers) {
        var playerName = $("#name").val().trim();
        players.push({
            name: playerName,
            losses: 0,
            wins: 0,
            choice: null
        });
        $("#row2").html("Hi " + playerName + "! You are Player " + players.length + "<br> It's your turn");

        // turn
        var turn = 0; // check
        database.ref().on("value", function(snapshot) {
            if (snapshot.child("turn").exists()) {
                // initial values
                turn = snapshot.val().turn; // check
            } else {}
            // If any errors are experienced, log them to console.
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        renderButtons(players.length);
        if (players.length > 1) {
            clearButtons(players.length);
        }

        // Save the new info in Firebase
        database.ref().set({
            players
        });
        console.log(players);
    }
});

// click buttons
$(document).on("click", ".attackOptions", function() {
    // turn variable
    var turn = 0;
    database.ref().on("value", function(snapshot) {
        if (snapshot.child("turn").exists()) {
            // initial values
            turn = snapshot.val().turn;
        } else {}
        // If any errors are experienced, log them to console.
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    if (players.length > 1) {
        turn++;
        if (turn === 3) {

          turn = 1; // reset turn
        }
        console.log(turn);
        var dataPlayer = $(this).attr("data-player");
        var attackPlayer = $(this).html();

        var playerButtonView = $("#" + dataPlayer + " .buttons-view");
        playerButtonView.text(attackPlayer);
        console.log(attackPlayer);
        console.log(dataPlayer);
        players[turn - 1].choice = attackPlayer;
    } else {
        console.log("waiting for player");
    }

    database.ref().set({
        players,
        turn
    });
});
