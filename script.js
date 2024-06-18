const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const currentPlayerDisplay = document.getElementById('current-player');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let scoreX = 0;
let scoreO = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (gameBoard[index] || checkWin()) {
        return;
    }

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        updateScore();
        setTimeout(() => alert(`${currentPlayer} выиграл!`), 100);
    } else if (gameBoard.every(cell => cell)) {
        setTimeout(() => alert('Ничья!'), 100);
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerDisplay();
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        scoreXDisplay.textContent = scoreX;
    } else {
        scoreO++;
        scoreODisplay.textContent = scoreO;
    }
}

function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = `Ходит: ${currentPlayer}`;
}

function restartGame() {
    gameBoard.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    updateCurrentPlayerDisplay();
}