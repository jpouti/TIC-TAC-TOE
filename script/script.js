const gameBoard = (() => {
    const board = [];
    for (let index = 0; index < 9; index++) {
        board.push("");
    }
    const winCombionations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return board, winCombionations;
})();

const playerFactory = (name, symbol) => {
    return {name, symbol}
}