const rollingTimeMilliseconds = 2000;
const rollingSpeedMilliseconds = 50;
let scoreboardIsOpen = false;

class Dice {
    constructor(checkbox, image, value) {
        this.checkbox = checkbox;
        this.image = image;
        this.value = value;
    }
}

let dice = getDice(document.querySelectorAll(".dice-checkbox"));

function rollDice() {
    let rollButton = document.getElementById('roll-button');
    let endTurnButton = document.getElementById('end-turn-button');
    let rollingDice;

    rollButton.disabled = true;
    endTurnButton.disabled = true;

    if (!allDiceLocked(dice)){
        dice.forEach(function(dice) {
            dice.checkbox.disabled = true;
        })

        setTimeout(function() {
            if (rollingDice) {
                clearInterval(rollingDice);
                rollingDice = null;
                rollButton.disabled = false;
                endTurnButton.disabled = false;
    
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
        endTurnButton.disabled = false;
    }
}

function getDice(diceElements) {
    let dice = [];

    for (let i = 0; i < diceElements.length; i++) {
        let image = findLableForElement(diceElements[i]).getElementsByTagName("img")[0];

        console.log(image);
         
        dice.push(new Dice(diceElements[i], image, 1))
    }

    return dice;
}

function findLableForElement(element) {
    let elementId = element.id;
    labels = document.getElementsByTagName("label");

    for (let i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == elementId) {
            return labels[i];
        }
    }
}

function allDiceLocked(dice) {
    let allDiceLocked = true;

    dice.forEach(function(die) {
        if (!die.checkbox.checked){
            allDiceLocked = false;
        }
    });

    return allDiceLocked;
}

function randomizeDieValue(die) {
    if (!die.checkbox.checked){
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        die.value = randomNumber;
        die.image.src = 'images/dice-' + randomNumber + '.png'
    }
}

function endTurn() {
    let dieValues = [];
    document.getElementById('main-ui').style.display = 'none';
    document.getElementById('choose-ui').style.display = 'block';

    dice.forEach(function(die) {
        dieValues.push(die.value);
    });

    let valueCounter = new ValueCounter(dieValues);
    valueCounter.printValues();

    displayTopValues(valueCounter);
    displayBottomValues(valueCounter);
}

function displayTopValues(valueCounter) {
    document.getElementById('ones-button').innerHTML = valueCounter.ValueCounts[0] + ' pts';
    document.getElementById('twos-button').innerHTML = 2 * valueCounter.ValueCounts[1] + ' pts';
    document.getElementById('threes-button').innerHTML = 3 * valueCounter.ValueCounts[2] + ' pts';
    document.getElementById('fours-button').innerHTML = 4 * valueCounter.ValueCounts[3] + ' pts';
    document.getElementById('fives-button').innerHTML = 5 * valueCounter.ValueCounts[4] + ' pts';
    document.getElementById('sixes-button').innerHTML = 6 * valueCounter.ValueCounts[5] + ' pts';
}

function displayBottomValues(valueCounter) {
    document.getElementById('one-pair-button').innerHTML = valueCounter.getOnePairValue(valueCounter) + ' pts';
    document.getElementById('two-pairs-button').innerHTML = valueCounter.getTwoPairsValue(valueCounter) + ' pts';
    document.getElementById('three-of-a-kind-button').innerHTML = valueCounter.getThreeOfAKindValue(valueCounter) + ' pts';
    document.getElementById('four-of-a-kind-button').innerHTML = valueCounter.getFourOfAKindValue(valueCounter) + ' pts';
    document.getElementById('small-straight-button').innerHTML = valueCounter.getSmallStraightValue(valueCounter) + ' pts';
    document.getElementById('large-straight-button').innerHTML = valueCounter.getLargeStraightValue(valueCounter) + ' pts';
    document.getElementById('full-house-button').innerHTML = valueCounter.getFullHouseValue(valueCounter) + ' pts';
    document.getElementById('chance-button').innerHTML = valueCounter.getChanceValue(valueCounter) + ' pts';
    document.getElementById('yatzy-button').innerHTML = valueCounter.getYatzyValue(valueCounter) + ' pts';
}

function toggleScoreboard() {
    document.getElementsByClassName("scoreboard")[0].style.display = scoreboardIsOpen ? 'none' : 'flex';
    scoreboardIsOpen = !scoreboardIsOpen;
}