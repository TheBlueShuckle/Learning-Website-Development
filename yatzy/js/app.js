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
        this.ones = 0; 
        this.twos = 0; 
        this.threes = 0;
        this.fours = 0;
        this.fives = 0; 
        this.sixes = 0;

        valueArr.forEach((value) => {
            switch (value) {
                case 1: 
                    this.ones++;
                    break;
                case 2:
                    this.twos++;
                    break;
                case 3: 
                    this.threes++;
                    break;
                case 4: 
                    this.fours++;
                    break;
                case 5: 
                    this.fives++;
                    break;
                case 6:
                    this.sixes++;
                    break;
            }
        })
    }

    printValues() {
        console.log(this.ones + ", " + this.twos + ", " + this.threes + ", " + this.fours + ", " + this.fives + ", " + this.sixes)
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

    dice.forEach(function(die) {
        dieValues.push(die.value);
    });

    let valueCounter = new ValueCounter(dieValues);
    valueCounter.printValues();
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