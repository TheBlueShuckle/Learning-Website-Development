const rollingTimeMilliseconds = 2000;
const rollingSpeedMilliseconds = 50;
var rollButton = document.getElementById('roll-button');
var hasStopped = false;

class Dice {
    constructor(checkbox, image, value) {
        this.checkbox = checkbox;
        this.image = image;
        this.value = value;
    }
}

var dice = getDice(document.querySelectorAll(".dice-checkbox"));

rollButton.addEventListener('click', rollDice);

function rollDice() {
    var rollingDice;

    rollButton.disabled = true;

    if (!allDiceLocked(dice)){
        dice.forEach(function(dice) {
            dice.checkbox.disabled = true;
        })

        setTimeout(function() {
            if (rollingDice) {
                clearInterval(rollingDice);
                rollingDice = null;
                rollButton.disabled = false;
    
                dice.forEach(function(dice) {
                    dice.checkbox.disabled = false;
                    console.log(dice.value);
                });
            }
        }, rollingTimeMilliseconds);
    
        rollingDice = setInterval(function() {
            dice.forEach(randomizeDieValue);
        }, rollingSpeedMilliseconds);
    }

    else {
        rollButton.disabled = false;
    }
}

function getDice(diceElements) {
    var dice = [];

    for (let i = 0; i < diceElements.length; i++) {
        var image = findLableForElement(diceElements[i]).getElementsByTagName("img")[0];

        console.log(image);
         
        dice.push(new Dice(diceElements[i], image, 1))
    }

    return dice;
}

function findLableForElement(element) {
    var elementId = element.id;
    labels = document.getElementsByTagName("label");

    for (let i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == elementId) {
            return labels[i];
        }
    }
}

function allDiceLocked(dice) {
    var allDiceLocked = true;

    dice.forEach(function(die) {
        if (!die.checkbox.checked){
            allDiceLocked = false;
        }
    });

    return allDiceLocked;
}

function randomizeDieValue(die) {
    if (!die.checkbox.checked){
        var randomNumber = Math.floor(Math.random() * 6) + 1;
        die.value = randomNumber;
        die.image.src = 'images/dice-' + randomNumber + '.png'
    }
}