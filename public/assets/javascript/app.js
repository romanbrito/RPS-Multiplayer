// Initialize Firebase
var database = firebase.database();
var chatDbase = firebase.database().ref("chat");

database.ref().set({
    players: null,
    turn: null
});

var players = [];
const NumOfPlayers = 2;
var playerNum = 1;

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
    if (turn === 2) {
        showButtons(1);
        clearButtons(2);
    }
    if (turn === 1) {
      showButtons(2);
      clearButtons(1);
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
        $("#row2").html("Hi " + playerName + "! You are Player " + players.length);

        playerNum = players.length;
        console.log("player number " + playerNum);

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
        if (players.length = 2) {
            clearButtons(2);
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
  clearButtons(playerNum);
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
        console.log("turn click " + turn);
        var dataPlayer = $(this).attr("data-player");
        var attackPlayer = $(this).html();

        var playerButtonView = $("#" + dataPlayer + " .choice");
        playerButtonView.text(attackPlayer);
        console.log(attackPlayer);
        console.log(dataPlayer);
        players[turn - 1].choice = attackPlayer;
    } else {
        $("#result").html("Waiting for player");
        showButtons(1);
    }

    database.ref().set({
        players,
        turn
    });
});

// chat funcionality

// if (snapshot.child("players").exists()) {
//     players = snapshot.val().players;
// } else {}

chatDbase.on("value", function(snapshot){
  if (snapshot.child("chat").exists()) {
    var message = snapshot.val().chat;
    $("#chatArea").append(message);
  }


});

$("#send-msg").on("click", function(event){
    event.preventDefault();
    var msg = $("#chatInput").val().trim();
    console.log(msg);
    chatDbase.set({
      chat: msg
    });
});
