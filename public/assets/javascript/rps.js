      // RPS game function
      function rpsGame(player1Attack, player2Attack) {
          // return true if player 1 wins
          // return false if player 1 loses
          // return -1 if tie

        // If the user presses "Rock" or "Paper" or "Scissors", run the game logic.
        if ((player1Attack === "Rock") || (player1Attack === "Paper") || (player1Attack === "Scissors")) {

          // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
          if ((player1Attack === "Rock") && (player2Attack === "Scissors")) {
            return true;
          }
          else if ((player1Attack === "Rock") && (player2Attack === "Paper")) {
            return false;
          }
          else if ((player1Attack === "Scissors") && (player2Attack === "Rock")) {
            return false;
          }
          else if ((player1Attack === "Scissors") && (player2Attack === "Paper")) {
            return true;
          }
          else if ((player1Attack === "Paper") && (player2Attack === "Rock")) {
            return true;
          }
          else if ((player1Attack === "Paper") && (player2Attack === "Scissors")) {
            return false;
          }
          else if (player1Attack === player2Attack) {
            return -1;
          } else {
            console.log("Error");
          }

        }
      };
