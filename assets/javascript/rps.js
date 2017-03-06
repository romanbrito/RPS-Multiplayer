      // RPS game function
      function rpsGame(player1Attack, player2Attack) {
          // return true if player 1 wins
          // return false if player 1 loses
          // return -1 if tie

        // If the user presses "rock" or "paper" or "scissors", run the game logic.
        if ((player1Attack === "rock") || (player1Attack === "paper") || (player1Attack === "scissors")) {

          // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
          if ((player1Attack === "rock") && (player2Attack === "scissors")) {
            return true;
          }
          else if ((player1Attack === "rock") && (player2Attack === "paper")) {
            return false;
          }
          else if ((player1Attack === "scissors") && (player2Attack === "rock")) {
            return false;
          }
          else if ((player1Attack === "scissors") && (player2Attack === "paper")) {
            return true;
          }
          else if ((player1Attack === "paper") && (player2Attack === "rock")) {
            return true;
          }
          else if ((player1Attack === "paper") && (player2Attack === "scissors")) {
            return false;
          }
          else if (player1Attack === player2Attack) {
            return -1;
          }

        }
      };
