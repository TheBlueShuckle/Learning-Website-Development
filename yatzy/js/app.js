const rollingTimeMilliseconds = 2000;
const rollingSpeedMilliseconds = 50;
let hasStopped = false;
let scoreboardIsOpen = false;

class Dice {
    constructor(checkbox, image, value) {
        this.checkbox = checkbox;
        this.image = image;
        this.value = value;
    }
}

class ValueCounter {
    constructor(valueArr) {
        this.valueCounts = [0, 0, 0, 0, 0, 0];

        valueArr.forEach((value) => {
            switch (value) {
                case 1: 
                    this.valueCounts[0]++;
                    break;
                case 2:
                    this.valueCounts[1]++;
                    break;
                case 3: 
                    this.valueCounts[2]++;
                    break;
                case 4: 
                    this.valueCounts[3]++;
                    break;
                case 5: 
                    this.valueCounts[4]++;
                    break;
                case 6:
                    this.valueCounts[5]++;
                    break;
            }
        })
    }

    get ValueCounts() {
        return this.valueCounts;
    }

    printValues() {
        console.log(this.valueCounts[0] + ", " + this.valueCounts[1] + ", " + this.valueCounts[2] + ", " + this.valueCounts[3] + ", " + this.valueCounts[4] + ", " + this.valueCounts[5])
    }
}

let dice = getDice(document.querySelectorAll(".dice-checkbox"));

function rollDice() {
    let rollButton = document.getElementById('roll-button');
    let rollingDice;

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
    checkOnePair(valueCounter);
    checkTwoPairs(valueCounter);
    checkThreeOfAKind(valueCounter);
    checkFourOfAKind(valueCounter);
    checkSmallStraight(valueCounter);
    checkLargeStraight(valueCounter);
    checkFullHouse(valueCounter);
    checkChance(valueCounter);
    checkYatzy(valueCounter);
}

function checkOnePair(valueCounter) {
    let calculatedValue = 0;

    for (let i = 0; i < valueCounter.ValueCounts.length; i++) {
        
        if (valueCounter.ValueCounts[i] === 2) {
            calculatedValue = 2 * (i + 1);
        }
    }

    document.getElementById('one-pair-button').innerHTML = calculatedValue + ' pts';
}

function checkTwoPairs(valueCounter) {
    let calculatedValue = 0;

    for (let i = 0; i < valueCounter.valueCounts.length; i++) {
        if (valueCounter.valueCounts[i] === 2) {
            for (let j = 0; j < valueCounter.valueCounts.length; j++) {
                if (j !== i && valueCounter.valueCounts[j] === 2) {
                    calculatedValue = 2 * ((j + 1) + (i + 1));
                    break;
                }
            }
            break;
        }
    }

    document.getElementById('two-pairs-button').innerHTML = calculatedValue + ' pts';
}

function checkThreeOfAKind(valueCounter) {
    let calculatedValue = 0;

    for (let i = 0; i < valueCounter.valueCounts.length; i++) {
        if (valueCounter.valueCounts[i] === 3) {
            calculatedValue = 3 * (i + 1);
        }
    }

    document.getElementById('three-of-a-kind-button').innerHTML = calculatedValue + ' pts';
}

function checkFourOfAKind(valueCounter) {
    let calculatedValue = 0;

    for (let i = 0; i < valueCounter.valueCounts.length; i++) {
        if (valueCounter.valueCounts[i] === 4) {
            calculatedValue = 4 * (i + 1);
        }
    }

    document.getElementById('four-of-a-kind-button').innerHTML = calculatedValue + ' pts';
}

function checkSmallStraight(valueCounter) {
    let values = valueCounter.valueCounts;
    let calculatedValue = 0;

    if (values[0] === 1 && values[1] === 1 && values[2] === 1 && values[3] === 1 && values[4] === 1){
        calculatedValue = 15;
    }

    document.getElementById('small-straight-button').innerHTML = calculatedValue + ' pts';
}

function checkLargeStraight(valueCounter) {
    let values = valueCounter.valueCounts;
    let calculatedValue = 0;

    if (values[1] === 1 && values[2] === 1 && values[3] === 1 && values[4] === 1 && values[5] === 1){
        calculatedValue = 30;
    }

    document.getElementById('large-straight-button').innerHTML = calculatedValue + ' pts';
}

function checkFullHouse(valueCounter) {
    let calculatedValue = 0;

    for (let i = 0; i < valueCounter.valueCounts.length; i++) {
        if (valueCounter.valueCounts[i] === 3) {
            for (let j = 0; j < valueCounter.valueCounts.length; j++) {
                if (valueCounter.valueCounts[i] === 2) {
                    calculatedValue = 3 * (i + 1) + 2 * (j + 1);
                    break;
                }
            }
            break;
        }
    }

    document.getElementById('full-house-button').innerHTML = calculatedValue + ' pts';
}

function checkChance(valueCounter) {
    let calculatedValue = 0;

    for (let i = 0; i < valueCounter.valueCounts.length; i++) {
        calculatedValue += (i + 1) * valueCounter.valueCounts[i];
    }

    document.getElementById('chance-button').innerHTML = calculatedValue + ' pts';
}

function checkYatzy(valueCounter) {
    let calculatedValue = 0;

    for (let i = 0; i < valueCounter.valueCounts.length; i++) {
        if (valueCounter.valueCounts[i] === 5) {
            calculatedValue = 50;
        }
    }

    document.getElementById('yatzy-button').innerHTML = calculatedValue + ' pts';
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

function toggleScoreboard() {
    if (scoreboardIsOpen){
        document.getElementsByClassName("scoreboard")[0].style.display = "none";
        scoreboardIsOpen = false;
    }

    else {
        document.getElementsByClassName("scoreboard")[0].style.display = "flex";
        scoreboardIsOpen = true;
    }
}