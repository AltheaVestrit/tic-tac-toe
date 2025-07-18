const runGame = (function () {
    const Gameboard = function () {
        const board = [["", "", ""], ["", "", ""], ["", "", ""]];
        const placeMarker = (row, column, marker) => {
            if (board[row][column] == "") {
                board[row][column] = marker
                return true;
            };
        };
        const getBoard = () => board;
        return { placeMarker, getBoard };
    };

    function GameController(playerOneName, playerTwoName) {
        const board = Gameboard();

        const players = [
            {
                name: playerOneName ? playerOneName : "Player One",
                marker: "X"
            },
            {
                name: playerTwoName ? playerTwoName : "Player Two",
                marker: "O"
            }
        ];

        let activePlayer = players[0];

        const switchPlayerTurn = () => {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        };

        const getActivePlayer = () => activePlayer;

        const playRound = (row, column) => {
            const markerPlaced = board.placeMarker(row, column, getActivePlayer().marker)
            if (!markerPlaced) {
                return;
            }
            if (checkWon()) {
                return;
            };
            switchPlayerTurn();
        };

        const checkWon = () => {
            let winningMarker = "";
            const currentBoard = board.getBoard();
            if (currentBoard[0][0] == currentBoard[0][1] && currentBoard[0][1] == currentBoard[0][2] && currentBoard[0][0] != "") {
                winningMarker = currentBoard[0][0];
            } else if (currentBoard[1][0] == currentBoard[1][1] && currentBoard[1][1] == currentBoard[1][2] && currentBoard[1][0] != "") {
                winningMarker = currentBoard[1][0];
            } else if (currentBoard[2][0] == currentBoard[2][1] && currentBoard[2][1] == currentBoard[2][2] && currentBoard[2][0] != "") {
                winningMarker = currentBoard[2][0];
            } else if (currentBoard[0][0] == currentBoard[1][0] && currentBoard[1][0] == currentBoard[2][0] && currentBoard[0][0] != "") {
                winningMarker = currentBoard[0][0];
            } else if (currentBoard[0][1] == currentBoard[1][1] && currentBoard[1][1] == currentBoard[2][1] && currentBoard[0][1] != "") {
                winningMarker = currentBoard[0][1];
            } else if (currentBoard[0][2] == currentBoard[1][2] && currentBoard[1][2] == currentBoard[2][2] && currentBoard[0][2] != "") {
                winningMarker = currentBoard[0][2];
            } else if (currentBoard[0][0] == currentBoard[1][1] && currentBoard[1][1] == currentBoard[2][2] && currentBoard[0][0] != "") {
                winningMarker = currentBoard[0][0];
            } else if (currentBoard[2][0] == currentBoard[1][1] && currentBoard[1][1] == currentBoard[0][2] && currentBoard[2][0] != "") {
                winningMarker = currentBoard[2][0];
            };
            return winningMarker;
        };

        const checkTie = () => {
            return !(board.getBoard().some(row => row.includes("")));
        };

        return { tie: checkTie, getActivePlayer, getBoard: board.getBoard, playRound, won: checkWon };
    };

    function ScreenController() {
        const display = document.querySelector("#console");
        const boardDiv = document.querySelector(".board");
        const startBtn = document.querySelector("#start");
        const playerOne = document.querySelector("#player-one").value;
        const playerTwo = document.querySelector("#player-two").value;

        const game = GameController(playerOne,playerTwo);

        const updateScreen = () => {
            display.textContent = "";
            boardDiv.textContent = "";

            const board = game.getBoard();
            const activePlayer = game.getActivePlayer();
            const gameWon = game.won();
            const gameTie = game.tie();

            if (gameWon) {
                display.textContent = `${activePlayer.name} (${activePlayer.marker}) has won!`;
            } else if (gameTie) {
                display.textContent = "It's a tie!"
            } else {
                display.textContent = `${activePlayer.name}'s turn (${activePlayer.marker}).`;
            };
        
            // Create the board
            board.forEach((row, rowindex) => {
                row.forEach((cell, columnindex) => {
                    const cellButton = document.createElement("button");
                    cellButton.classList.add("cell");
                    cellButton.dataset.row = rowindex;
                    cellButton.dataset.column = columnindex;
                    cellButton.textContent = cell;
                    if (cell != "" || gameWon || gameTie) {
                        cellButton.disabled = true;
                    }
                    if (gameWon || gameTie) {
                        cellButton.classList.add("end");
                    }
                    boardDiv.appendChild(cellButton);
                });
            });
        };

        function clickHandlerBoard(e) {
            const selectedRow = e.target.dataset.row;
            const selectedColumn = e.target.dataset.column;
            if (!selectedRow) {
                return;
            };
            game.playRound(selectedRow, selectedColumn);

            updateScreen();
        };

        boardDiv.addEventListener("click", clickHandlerBoard);

        startBtn.addEventListener("click",(e) => {
            e.preventDefault();
            ScreenController();
        });

        updateScreen();
    };

    ScreenController();
})();