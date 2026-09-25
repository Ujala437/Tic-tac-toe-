// ===============================
// PLAYER NAME
// ===============================

let playerX = prompt("Player 1 ka naam enter karo:");

let playerO = prompt("Player 2 ka naam enter karo:");


// Agar naam nahi diya
if (playerX === null || playerX.trim() === "") {
    playerX = "Player X";
}

if (playerO === null || playerO.trim() === "") {
    playerO = "Player O";
}


// Names screen par show karo
document.getElementById("nameX").innerText = playerX;

document.getElementById("nameO").innerText = playerO;


// ===============================
// GAME VARIABLES
// ===============================

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];


let currentPlayer = "X";

let gameOver = false;


// Score
let scoreX = 0;

let scoreO = 0;


// ===============================
// WINNING PATTERNS
// ===============================

const winningPatterns = [

    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6]

];


// ===============================
// CELLS
// ===============================

const cells = document.querySelectorAll(".cell");


// Har box par click event
cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        let index = cell.getAttribute("data-index");

        play(index);

    });

});


// ===============================
// PLAY FUNCTION
// ===============================

function play(index) {

    // Agar game finish ho chuka hai
    if (gameOver) {

        return;

    }


    // Agar box already filled hai
    if (board[index] !== "") {

        document.getElementById("message").innerText =
            "⚠️ Ye box already filled hai!";

        return;

    }


    // Current player ka symbol store karo
    board[index] = currentPlayer;


    // Screen par symbol show karo
    if (currentPlayer === "X") {

        cells[index].innerText = "❌";

    } else {

        cells[index].innerText = "⭕";

    }


    // Box ko disable karo
    cells[index].disabled = true;


    // Winner check
    let winningPattern = checkWinner();


    if (winningPattern !== null) {

        gameOver = true;

        let winnerName;


        if (currentPlayer === "X") {

            winnerName = playerX;

            scoreX++;

            document.getElementById("scoreX").innerText =
                scoreX;

        } else {

            winnerName = playerO;

            scoreO++;

            document.getElementById("scoreO").innerText =
                scoreO;

        }


        // Winner message
        document.getElementById("message").innerText =
            "🎉 " + winnerName + " WINNER HAI! 🏆";


        // Winning boxes highlight
        winningPattern.forEach(function(position) {

            cells[position].classList.add("winner");

        });


        return;

    }


    // ===============================
    // DRAW CHECK
    // ===============================

    if (!board.includes("")) {

        gameOver = true;

        document.getElementById("message").innerText =
            "🤝 Match Draw Ho Gaya!";

        return;

    }


    // ===============================
    // PLAYER CHANGE
    // ===============================

    if (currentPlayer === "X") {

        currentPlayer = "O";

        document.getElementById("message").innerText =
            playerO + " ki turn hai ⭕";

    } else {

        currentPlayer = "X";

        document.getElementById("message").innerText =
            playerX + " ki turn hai ❌";

    }


    updateActivePlayer();

}


// ===============================
// CHECK WINNER
// ===============================

function checkWinner() {

    for (let pattern of winningPatterns) {

        let a = pattern[0];

        let b = pattern[1];

        let c = pattern[2];


        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            return pattern;

        }

    }


    return null;

}


// ===============================
// ACTIVE PLAYER
// ===============================

function updateActivePlayer() {

    document
        .getElementById("playerX")
        .classList.remove("active");


    document
        .getElementById("playerO")
        .classList.remove("active");


    if (currentPlayer === "X") {

        document
            .getElementById("playerX")
            .classList.add("active");

    } else {

        document
            .getElementById("playerO")
            .classList.add("active");

    }

}


// ===============================
// NEXT ROUND
// ===============================

function nextRound() {

    // Board empty
    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    // X se new round start
    currentPlayer = "X";


    gameOver = false;


    // Saare boxes clear
    cells.forEach(function(cell) {

        cell.innerText = "";

        cell.disabled = false;

        cell.classList.remove("winner");

    });


    // Message
    document.getElementById("message").innerText =
        playerX + " ki turn hai ❌";


    updateActivePlayer();

}


// ===============================
// RESET GAME
// ===============================

function resetGame() {

    // Score zero
    scoreX = 0;

    scoreO = 0;


    document.getElementById("scoreX").innerText = "0";

    document.getElementById("scoreO").innerText = "0";


    // New round
    nextRound();

}