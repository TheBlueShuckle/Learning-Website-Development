const rollingTimeMilliseconds = 2000;
const rollingSpeedMilliseconds = 50;
var rollButton = document.getElementById('roll-button');
var hasStopped = false;
var storedDiceValues = [];

rollButton.addEventListener('click', rollDice);

function rollDice() {
    var rollingDice;
    var dice = getDice(document.querySelectorAll(".dice-checkbox"));

    rollButton.disabled = true;

    if (!checkLockedDice(dice)){
        dice.forEach(function(dice) {
            dice.checkbox.disabled = true;
        })

        setTimeout(function() {
            if (rollingDice) {
                clearInterval(rollingDice);
                rollingDice = null;
                rollButton.disabled = false;
                storedDiceValues = [];
    
                dice.forEach(function(dice) {
                    storedDiceValues.push(dice.value);
                    dice.checkbox.disabled = false;
                });
            }
        }, rollingTimeMilliseconds);
    
        rollingDice = setInterval(function() {
            dice.forEach(randomizeDiceValue);
        }, rollingSpeedMilliseconds);
    }

    else {
        rollButton.disabled = false;
    }
}

class Dice {
    constructor(checkbox, image, value) {
        this.checkbox = checkbox;
        this.image = image;
        this.value = value;
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
    var idVal = element.id;
    labels = document.getElementsByTagName("label");

    for (let i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == idVal) {
            return labels[i];
        }
    }
}

function checkLockedDice(dice) {
    var allDiceLocked = true;

    dice.forEach(function(dice) {
        if (!dice.checkbox.checked){
            allDiceLocked = false;
        }
    });

    return allDiceLocked;
}

function randomizeDiceValue(dice) {
    if (!dice.checkbox.checked){
        var randomNumber = Math.floor(Math.random() * 6) + 1;
        dice.value = randomNumber;
        dice.image.src = 'images/dice-' + randomNumber + '.png'
    }
}