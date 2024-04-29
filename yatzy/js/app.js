var rollButton = document.getElementById('roll-button');
var hasStopped = false;

rollButton.addEventListener('click', rollDice);

function rollDice() {
    var diceElements = document.querySelectorAll(".dice");
    var diceValues = [];
    var rollingTimeMilliseconds = 2000;
    var rollingSpeedMilliseconds = 50;
    var rollingDice;

    rollButton.disabled = true;

    setTimeout(function() {
        if (rollingDice) {
            clearInterval(rollingDice);
            rollingDice = null;
            rollButton.disabled = false;
        }
    }, rollingTimeMilliseconds);

    rollingDice = setInterval(function() {
        var i = 0;

        diceElements.forEach(function(node) {
            var randomNumber = Math.floor(Math.random() * 6) + 1;
            diceValues[i] = randomNumber;
            i++;
            node.src = 'images/dice-' + randomNumber + '.png'
        });
    }, rollingSpeedMilliseconds);
}