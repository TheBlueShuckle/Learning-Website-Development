// Skapa variablerna till de olika delarna i HTML-koden.
const p1Button = document.querySelector('#p1Button');
const p2Button = document.querySelector('#p2Button');
const resetButton = document.querySelector('#reset');
const p1Display = document.querySelector('#p1Display');
const p2Display = document.querySelector('#p2Display');
const winningScoreSelect = document.querySelector('#playto');
// Skapa övriga variabler
let p1Score = 0;
let p2Score = 0;
let winningScore = 3;
let isGameOver = false;

// Skapa händelselyssnare och metod till spelare 1:s knapp
p1Button.addEventListener('click', function () {
    if (!isGameOver) {
        p1Score += 1;

        if (p1Score === winningScore) {
            isGameOver = true;
            p1Display.classList.add('has-text-success');
            p2Display.classList.add('has-text-danger');
            p1Button.disabled = true;
            p2Button.disabled = true;
        }

        p1Display.textContent = p1Score;
    }
});

// Skapa händelselyssnare och metod till spelare 2:s knapp
p2Button.addEventListener('click', function () {
    if (!isGameOver) {
        p2Score += 1;

        if (p2Score === winningScore) {
            isGameOver = true;
            p1Display.classList.add('has-text-danger');
            p2Display.classList.add('has-text-success');
            p1Button.disabled = true;
            p2Button.disabled = true;
        }

        p2Display.textContent = p2Score;
    }
});

// Om man ändrar vilken poäng som man ska spela till
winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
});

// Händelselyssnare till resetknapp
resetButton.addEventListener('click', reset);

// Metod som anropas när spelet ska starts om.
function reset() {
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    p1Display.classList.remove('has-text-success', 'has-text-danger');
    p2Display.classList.remove('has-text-success', 'has-text-danger');
    p1Button.disabled = false;
    p2Button.disabled = false;
}