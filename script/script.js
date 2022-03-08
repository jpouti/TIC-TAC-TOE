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

    return {board, winCombinations, scoreBoard};
})();

const playerFactory = (name, symbol) => {
    return {name, symbol}
}

const player1 = playerFactory("Player 1", "X");
const player2 = playerFactory("Player 2", "O");

const gameFlow = (() => {
    // Display gameboard array symbols on gameboard
    const displayPlay = () => {
        document.querySelectorAll(".gamecard").forEach((gamecard, index) => {
            gamecard.textContent = gameBoard.board[index];
        });
        checkScore();
    }
    const win = (name) => {
        gameBoard.scoreBoard("Winner is: " + name);
        document.querySelectorAll(".gamecard").forEach(gamecard => {
            gamecard.removeEventListener("click", clickHandler)
        });
    }
    const tie = () => {
        gameBoard.scoreBoard("It is a draw, nobody wins...");
    }
    return {win, tie, displayPlay};
})();

document.querySelectorAll(".gamecard").forEach(gamecard => {
    gamecard.addEventListener("click", clickHandler)
});

// Adds the the symbol to the corresponging index on the gameboard array
function clickHandler(e) {
    let dataIndex = e.target.getAttribute("data-id");
    if (gameBoard.board[dataIndex] !== "") {
        gameBoard.scoreBoard("This spot is already taken, please try another spot");
        return;
    } else {
        let emptyCards = gameBoard.board.filter(x => x ==="").length;
        if (emptyCards % 2 === 0) {
            gameBoard.board[dataIndex] = 'O'
        } else {
            gameBoard.board[dataIndex] = 'X';
        }
        gameFlow.displayPlay();
    }
}

// check if round has end to a win or a tie
function checkScore() {
    gameBoard.winCombinations.forEach(combo => {
        let a = combo[0], b = combo[1], c = combo[2];
        if (gameBoard.board[a] != "" && gameBoard.board[a]==gameBoard.board[b] && gameBoard.board[b]==gameBoard.board[c]) {
            if (gameBoard.board[a] === "X") {
                gameFlow.win(player1.name);
            } else {
                gameFlow.win(player2.name);
            }
        }        
    });
    let emptyCards = gameBoard.board.filter(x => x ==="").length;
    if (emptyCards === 0) {
        gameFlow.tie();
    }
}