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
    setPointTextById('ones-button', valueCounter.ValueCounts[0])
    setPointTextById('twos-button', 2 * valueCounter.ValueCounts[1])
    setPointTextById('threes-button', 3 * valueCounter.ValueCounts[2])
    setPointTextById('fours-button', 4 * valueCounter.ValueCounts[3])
    setPointTextById('fives-button', 5 * valueCounter.ValueCounts[4])
    setPointTextById('sixes-button', 6 * valueCounter.ValueCounts[5])
}

function displayBottomValues(valueCounter) {
    setPointTextById('one-pair-button', valueCounter.getOnePairValue(valueCounter))
    setPointTextById('two-pairs-button', valueCounter.getTwoPairsValue(valueCounter))
    setPointTextById('three-of-a-kind-button', valueCounter.getThreeOfAKindValue(valueCounter))
    setPointTextById('four-of-a-kind-button', valueCounter.getFourOfAKindValue(valueCounter))
    setPointTextById('small-straight-button', valueCounter.getSmallStraightValue(valueCounter))
    setPointTextById('large-straight-button', valueCounter.getLargeStraightValue(valueCounter))
    setPointTextById('full-house-button', valueCounter.getFullHouseValue(valueCounter))
    setPointTextById('chance-button', valueCounter.getChanceValue(valueCounter))
    setPointTextById('yatzy-button', valueCounter.getYatzyValue(valueCounter))
}

function setPointTextById(id, value) {
    document.getElementById(id).innerHTML = value + ' pts';
}

function toggleScoreboard() {
    document.getElementsByClassName("scoreboard")[0].style.display = scoreboardIsOpen ? 'none' : 'flex';
    scoreboardIsOpen = !scoreboardIsOpen;
}