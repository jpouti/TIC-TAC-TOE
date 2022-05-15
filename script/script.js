let winner = false; // declares whether winner is active

const gameBoard = (() => {
    const board = [];
    for (let index = 0; index < 9; index++) {
        board.push("");
    }
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    const scoreBoard = (text) => {
        document.querySelector(".scoreboard-container").textContent = text;
    }
    const changePlayer1 = (name) => {
        player1.name = name;
        document.getElementById('player1').textContent = name;
        return player1;
    }
    const changePlayer2 = (name) => {
        player2.name = name;
        document.getElementById('player2').textContent = name;
        return player2;
    }
    return {board, winCombinations, scoreBoard, changePlayer1, changePlayer2};
})();

const playerFactory = (name, symbol) => {
    return {name, symbol}
}

// create players as default
const player1 = playerFactory("Player 1", "X");
const player2 = playerFactory("Player 2", "O");

const gameFlow = (() => {
    // Display gameboard array symbols on gameboard
    const displayPlay = () => {
        document.querySelectorAll(".gamecard").forEach((gamecard, index) => {
            gamecard.textContent = gameBoard.board[index];
            if (gameBoard.board[index] === 'O') {
                gamecard.style.color = 'darkred';
            }
        });
        checkScore();
    }
    const win = (name) => {
        gameBoard.scoreBoard("Winner is: " + name);
        gameFlow.endGame();
    }
    const tie = () => {
        gameBoard.scoreBoard("It is a draw, nobody wins...");
        gameFlow.endGame();
    }
    const newGame = () => {
        console.log('new game');
        gameBoard.board = [];
        for (let index = 0; index < 9; index++) {
            gameBoard.board.push("");
        }
        gameFlow.displayPlay();
        gameFlow.startGame();
        gameBoard.scoreBoard("");
        winner = false;
    }
    const startGame = () => {
        document.getElementById('player1').className = 'active';
        document.querySelectorAll(".gamecard").forEach(gamecard => {
            gamecard.style.color = 'navy'; //set default color
            gamecard.addEventListener("click", clickHandler)
        });
    }
    const endGame = () => {
        document.querySelectorAll(".gamecard").forEach(gamecard => {
            gamecard.removeEventListener("click", clickHandler)
        });
    }
    return {win, tie, displayPlay, newGame, startGame, endGame};
})();

// Adds the the symbol to the corresponging index on the gameboard array
function clickHandler(e) {
    gameBoard.scoreBoard("");
    let dataIndex = e.target.getAttribute("data-id");
    if (gameBoard.board[dataIndex] !== "") {
        gameBoard.scoreBoard("This spot is already taken, please try another spot");
        return;
    } else {
        let emptyCards = gameBoard.board.filter(x => x ==="").length;
        if (emptyCards % 2 === 0) {
            gameBoard.board[dataIndex] = 'O'
            document.getElementById('player1').className = 'active';
            document.getElementById('player2').className = '';
        } else {
            gameBoard.board[dataIndex] = 'X';
            document.getElementById('player2').className = 'active';
            document.getElementById('player1').className = '';
        }
        gameFlow.displayPlay();
    }
}

document.querySelector('#new-game').addEventListener("click", () => {
    gameFlow.newGame();
});

document.querySelector('#player-names').addEventListener('click', () => {
    gameFlow.newGame();
    let name1 = prompt("Please input a new player to replace: " + player1.name);
    gameBoard.changePlayer1(name1);
    let name2 = prompt("Who dares to challenge " + player1.name + " with the lucky symbol: " + player2.symbol);
    gameBoard.changePlayer2(name2);
})

// check if round has end to a win or a tie
function checkScore() {
    gameBoard.winCombinations.forEach(combo => {
        let a = combo[0], b = combo[1], c = combo[2];
        if (gameBoard.board[a] != "" && gameBoard.board[a]==gameBoard.board[b] && gameBoard.board[b]==gameBoard.board[c]) {
            if (gameBoard.board[a] === "X") {
                gameFlow.win(player1.name);
                document.getElementById('player1').className = 'active';
                document.getElementById('player2').className = '';
                winner = true;
                return player1.name;
            } else {
                gameFlow.win(player2.name);
                document.getElementById('player2').className = 'active';
                document.getElementById('player1').className = '';
                winner = true;
                return player2.name;
            }
        } else if (gameBoard.board.filter(x => x ==="").length === 0) {
            if (winner === false) {
                gameFlow.tie();
            }
        }
    });
}

gameFlow.startGame();