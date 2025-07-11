const gameboard = (function () {
    let board = [[" "," "," "], [" "," "," "], [" "," "," "]];
    const placeMarker = (x, y, marker) => { board[x][y] = marker };
    const getBoard = () => board;
    const printBoard = () => board.forEach((row) => console.log(row));
    return { placeMarker, getBoard, printBoard };
})();

gameboard.placeMarker(0, 2, "X");
gameboard.printBoard();