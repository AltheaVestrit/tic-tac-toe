const prompt = require('prompt-sync')();

const Gameboard = function () {
    const board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    const placeMarker = (row, column, marker) => {
        if (board[row][column] == " ") {
            board[row][column] = marker
        };
    };
    const getBoard = () => board;
    const printBoard = () => board.forEach((row) => console.log(row));
    return { placeMarker, getBoard, printBoard };
};

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            marker: "X"
        },
        {
            name: playerTwoName,
            marker: "O"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn (${getActivePlayer().marker}).`)
    };

    const playRound = (row, column) => {
        board.placeMarker(row, column, getActivePlayer().marker)
        if (checkWon() == true) {
            return true;
        };
        switchPlayerTurn();
        printNewRound();
    };

    const checkWon = () => {
        let winningMarker = "";
        const currentBoard = board.getBoard();
        if (currentBoard[0][0] == currentBoard[0][1] && currentBoard[0][1] == currentBoard[0][2] && currentBoard[0][0] != " ") {
            winningMarker = currentBoard[0][0];
        } else if (currentBoard[1][0] == currentBoard[1][1] && currentBoard[1][1] == currentBoard[1][2] && currentBoard[1][0] != " ") {
            winningMarker = currentBoard[1][0];
        } else if (currentBoard[2][0] == currentBoard[2][1] && currentBoard[2][1] == currentBoard[2][2] && currentBoard[2][0] != " ") {
            winningMarker = currentBoard[2][0];
        } else if (currentBoard[0][0] == currentBoard[1][0] && currentBoard[1][0] == currentBoard[2][0] && currentBoard[0][0] != " ") {
            winningMarker = currentBoard[0][0];
        } else if (currentBoard[0][1] == currentBoard[1][1] && currentBoard[1][1] == currentBoard[2][1] && currentBoard[0][1] != " ") {
            winningMarker = currentBoard[0][1];
        } else if (currentBoard[0][2] == currentBoard[1][2] && currentBoard[1][2] == currentBoard[2][2] && currentBoard[0][2] != " ") {
            winningMarker = currentBoard[0][2];
        } else if (currentBoard[0][0] == currentBoard[1][1] && currentBoard[1][1] == currentBoard[2][2] && currentBoard[0][0] != " ") {
            winningMarker = currentBoard[0][0];
        } else if (currentBoard[2][0] == currentBoard[1][1] && currentBoard[1][1] == currentBoard[0][2] && currentBoard[2][0] != " ") {
            winningMarker = currentBoard[2][0];
        };
        if (winningMarker == "X") {
            board.printBoard();
            console.log(`The winner is ${players[0].name}!`);
            return true;
        } else if (winningMarker == "O") {
            board.printBoard();
            console.log(`The winner is ${players[1].name}!`);
            return true;
        } else {
            console.log("Loading next round...");
        }
    };

    printNewRound();

    return { playRound, getActivePlayer, getBoard: board.getBoard};
};

function ConsoleController() {
    const game = GameController();
    
    const updateConsole = () => {
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const moveRow = prompt("Please select the row for your marker [0, 1 or 2]: ");
        const moveColumn = prompt("Please select the column for your marker [0, 1 or 2]: ");
        if (game.playRound(moveRow, moveColumn) == true) {
            return;
        };
        updateConsole();
    }

    updateConsole();
};

ConsoleController();