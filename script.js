const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const gridSizeSelect = document.getElementById('grid-size');

let currentPlayer = 'X';
let boardState = [];
let difficulty = 'medium';
let gridSize = 3;

const winningCombinations = {
    3: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    4: [
        // Add 4x4 winning combinations here
    ],
    20: [
        // Add 20x20 winning combinations here
    ]
};

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] === '') {
        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            resetGame();
        } else if (boardState.every(cell => cell !== '')) {
            alert("It's a draw!");
            resetGame();
        } else {
            currentPlayer = 'O';
            setTimeout(makeAIMove, 500);
        }
    }
}

function checkWin() {
    return winningCombinations[gridSize].some(combination => {
        return combination.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function resetGame() {
    boardState = Array(gridSize * gridSize).fill('');
    renderBoard();
    currentPlayer = 'X';
}

function setDifficulty(level) {
    difficulty = level;
    resetGame();
}

function changeGridSize() {
    gridSize = parseInt(gridSizeSelect.value, 10);
    resetGame();
}

function makeAIMove() {
    let availableIndices = [];
    boardState.forEach((cell, index) => {
        if (cell === '') {
            availableIndices.push(index);
        }
    });

    let aiIndex;
    if (difficulty === 'easy') {
        aiIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else if (difficulty === 'medium') {
        aiIndex = findBestMove();
    } else {
        aiIndex = findBestMove(true);
    }

    boardState[aiIndex] = 'O';
    document.querySelector(`[data-index="${aiIndex}"]`).textContent = 'O';

    if (checkWin()) {
        alert(`O wins!`);
        resetGame();
    } else if (boardState.every(cell => cell !== '')) {
        alert("It's a draw!");
        resetGame();
    } else {
        currentPlayer = 'X';
    }
}

function findBestMove(isHard = false) {
    // Basic AI logic for medium difficulty
    // For hard difficulty, add more sophisticated logic
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === '') {
            return i;
        }
    }
    return -1;
}

function renderBoard() {
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

window.onload = resetGame;
const notification = document.getElementById('notification');

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] === '') {
        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            showNotification(`${currentPlayer} wins!`);
            if (currentPlayer === 'X') {
                displayConfetti();
            }
            setTimeout(resetGame, 2000);
        } else if (boardState.every(cell => cell !== '')) {
            showNotification("It's a draw!");
            setTimeout(resetGame, 2000);
        } else {
            currentPlayer = 'O';
            setTimeout(makeAIMove, 500);
        }
    }
}

function makeAIMove() {
    let availableIndices = [];
    boardState.forEach((cell, index) => {
        if (cell === '') {
            availableIndices.push(index);
        }
    });

    let aiIndex;
    if (difficulty === 'easy') {
        aiIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else if (difficulty === 'medium') {
        aiIndex = findBestMove();
    } else {
        aiIndex = findBestMove(true);
    }

    boardState[aiIndex] = 'O';
    document.querySelector(`[data-index="${aiIndex}"]`).textContent = 'O';

    if (checkWin()) {
        showNotification(`O wins!`);
        setTimeout(resetGame, 2000);
    } else if (boardState.every(cell => cell !== '')) {
        showNotification("It's a draw!");
        setTimeout(resetGame, 2000);
    } else {
        currentPlayer = 'X';
    }
}

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

function displayConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);

        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * -50}px`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

        confetti.style.animationDuration = `${Math.random() * 3 + 1}s`;
        confetti.style.animationDelay = `${Math.random() * 1}s`;

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}


