// Initialize Firebase
var database = firebase.database();
function player(name, attack) {
  this.name = name;
  this.attack =  attack
}
var player1 = new player(null, null);
var player2 = new player(null, null);

$("#submit-name").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();
    if (player1.name) {
        player2.name = $("#name").val().trim();
        $("#player2 p").html("player 2 name " + player2.name);
    } else {
        player1.name = $("#name").val().trim();
        $("#player1 p").html("player 1 name " + player1.name);
    }
    // Save the new info in Firebase
    database.ref().set({
        player1,
        player2
    });
});

$(document).on("click", ".attackOptions", function () {
    var dataPlayer = $(this).attr("data-player");
    var attackPlayer = $(this).html();
    console.log(attackPlayer);
    console.log(dataPlayer);
    if (dataPlayer === "playerNum1") {
      player1.attack = attackPlayer;
    } else if (dataPlayer === "playerNum2") {
      player2.attack = attackPlayer;
    }
});
