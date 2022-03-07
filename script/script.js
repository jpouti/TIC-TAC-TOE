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
    ];

    return {board, winCombinations};
})();

const playerFactory = (name, symbol) => {
    return {name, symbol}
}

const player1 = ("Player 1", "X");
const player2 = ("Player 2", "O");

document.querySelectorAll(".gamecard").forEach(gamecard => {
    gamecard.addEventListener("click", clickHandler)
});

// Adds the the symbol to the corresponging index on the gameboard array
function clickHandler(e) {
    let dataIndex = e.target.getAttribute("data-id");
    if (gameBoard.board[dataIndex] !== "") {
        console.log("This spot is already taken")
        return;
    } else {
        let emptyCards = gameBoard.board.filter(x => x ==="").length;
        if (emptyCards % 2 === 0) {
            gameBoard.board[dataIndex] = 'O'
        } else {
            gameBoard.board[dataIndex] = 'X';
        }
        displayValues();
    }
}

// displays the gameboard symbols
function displayValues() {
    document.querySelectorAll(".gamecard").forEach((gamecard, index) => {
        gamecard.textContent = gameBoard.board[index];
    });
};