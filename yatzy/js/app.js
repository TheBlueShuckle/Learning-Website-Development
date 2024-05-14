const rollingTimeMilliseconds = 2000;
const rollingSpeedMilliseconds = 50;
let scoreboardIsOpen = false;
let turn = 0;
let diceRollCount = 0;
let valueCounter;
let player1;
let player2;

class Dice {
    constructor(checkbox, image, value) {
        this.checkbox = checkbox;
        this.image = image;
        this.value = value;
    }
}

let dice = getDice(document.querySelectorAll(".dice-checkbox"));
initiatePlayers();

for (let i = 0; i < document.querySelectorAll('.score-button').length; i++) {
    document.querySelectorAll('.score-button')[i].addEventListener("click", function() {
        changePlayer(i);
    });
}

function changePlayer(i) {
    let buttonId = document.getElementsByClassName('score-button')[i].id;
    addScoreToPlayerScore(buttonId);
    getCurrentPlayer().pickedCombinations.push(buttonId);

    for (let i = 0; i < document.querySelectorAll('.score-button').length; i++) {
        document.querySelectorAll('.score-button')[i].disabled = false;
    }

    updateScoreboard();
    turn++;
    diceRollCount = 0;
    document.getElementById('main-ui').style.display = 'block';
    document.getElementById('choose-ui').style.display =  'none';
}

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

                diceRollCount++;

                if (diceRollCount < 1) {
                    endTurnButton.disabled = true;
                }

                if (diceRollCount > 2) {
                    rollButton.disabled = true;
                }
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

    valueCounter = new ValueCounter(dieValues);
    valueCounter.printValues();
    lockPickedCombinations(getCurrentPlayer());

    displayValues(valueCounter);
}

function displayValues(valueCounter) {
    setPointTextById('ones-button', valueCounter.ValueCounts[0])
    setPointTextById('twos-button', 2 * valueCounter.ValueCounts[1])
    setPointTextById('threes-button', 3 * valueCounter.ValueCounts[2])
    setPointTextById('fours-button', 4 * valueCounter.ValueCounts[3])
    setPointTextById('fives-button', 5 * valueCounter.ValueCounts[4])
    setPointTextById('sixes-button', 6 * valueCounter.ValueCounts[5])

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

function addScoreToPlayerScore(id) {
    switch(id) {
        case 'ones-button': 
            getCurrentPlayer().ones = valueCounter.ValueCounts[0];
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().ones);
            break;
        case 'twos-button': 
            getCurrentPlayer().twos = 2 * valueCounter.ValueCounts[1];
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().twos);
            break;
        case 'threes-button': 
            getCurrentPlayer().threes = 3 * valueCounter.ValueCounts[2];
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().threes);
            break;
        case 'fours-button': 
            getCurrentPlayer().fours = 4 * valueCounter.ValueCounts[3];
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().fours);
            break;
        case 'fives-button': 
            getCurrentPlayer().fives = 5 * valueCounter.ValueCounts[4];
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().fives);
            break;
        case 'sixes-button': 
            getCurrentPlayer().sixes = 6 * valueCounter.ValueCounts[5];
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().sixes);
            break;
        case 'one-pair-button': 
            getCurrentPlayer().onePair = valueCounter.getOnePairValue();
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().onePair);
            break;
        case 'two-pairs-button': 
            getCurrentPlayer().twoPairs = valueCounter.getTwoPairsValue();
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().twoPairs);
            break;
        case 'three-of-a-kind-button': 
            getCurrentPlayer().threeOfAKind = valueCounter.getThreeOfAKindValue();
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().threeOfAKind);
            break;
        case 'four-of-a-kind-button': 
            getCurrentPlayer().fourOfAKind = valueCounter.getFourOfAKindValue();
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().fourOfAKind);
            break;
        case 'small-straight-button': 
            getCurrentPlayer().smallStraight = valueCounter.getSmallStraightValue();
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().smallStraight);
            break;
        case 'large-straight-button': 
            getCurrentPlayer().largeStraight = valueCounter.getLargeStraightValue();
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().largeStraight);
            break;
        case 'full-house-button': 
            getCurrentPlayer().fullHouse = valueCounter.getFullHouseValue();
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().fullHouse)
            break;
        case 'chance-button': 
            getCurrentPlayer().chance = valueCounter.getChanceValue();
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().chance);
            break;
        case 'yatzy-button': 
            getCurrentPlayer().yatzy = valueCounter.getYatzyValue();
            console.log("Success! \nPlayers new value is " + getCurrentPlayer().yatzy);
            break;
    }
}

function getCurrentPlayer() {
    return turn % 2 === 0 ?  player1 : player2;
}

function updateScoreboard() {
    if (getCurrentPlayer() === player1) {
        updateScoreboardValue('p1-ones', player1.ones)
        updateScoreboardValue('p1-twos', player1.twos)
        updateScoreboardValue('p1-threes', player1.threes)
        updateScoreboardValue('p1-fours', player1.fours)
        updateScoreboardValue('p1-fives', player1.fives)
        updateScoreboardValue('p1-sixes', player1.sixes)
        updateScoreboardValue('p1-top-sum', player1.getSumUpperHalf())
        updateScoreboardValue('p1-bonus', player1.getBonus())
        updateScoreboardValue('p1-one-pair', player1.onePair)
        updateScoreboardValue('p1-two-pairs', player1.twoPairs)
        updateScoreboardValue('p1-three-of-a-kind', player1.threeOfAKind)
        updateScoreboardValue('p1-four-of-a-kind', player1.fourOfAKind)
        updateScoreboardValue('p1-small-straight', player1.smallStraight)
        updateScoreboardValue('p1-large-straight', player1.largeStraight)
        updateScoreboardValue('p1-full-house', player1.fullHouse)
        updateScoreboardValue('p1-chance', player1.chance)
        updateScoreboardValue('p1-yatzy', player1.yatzy)
        updateScoreboardValue('p1-total', player1.getTotalSum())
    }

    if (getCurrentPlayer() === player2) {
        updateScoreboardValue('p2-ones', player2.ones)
        updateScoreboardValue('p2-twos', player2.twos)
        updateScoreboardValue('p2-threes', player2.threes)
        updateScoreboardValue('p2-fours', player2.fours)
        updateScoreboardValue('p2-fives', player2.fives)
        updateScoreboardValue('p2-sixes', player2.sixes)
        updateScoreboardValue('p2-top-sum', player2.getSumUpperHalf())
        updateScoreboardValue('p2-bonus', player2.getBonus())
        updateScoreboardValue('p2-one-pair', player2.onePair)
        updateScoreboardValue('p2-two-pairs', player2.twoPairs)
        updateScoreboardValue('p2-three-of-a-kind', player2.threeOfAKind)
        updateScoreboardValue('p2-four-of-a-kind', player2.fourOfAKind)
        updateScoreboardValue('p2-small-straight', player2.smallStraight)
        updateScoreboardValue('p2-large-straight', player2.largeStraight)
        updateScoreboardValue('p2-full-house', player2.fullHouse)
        updateScoreboardValue('p2-chance', player2.chance)
        updateScoreboardValue('p2-yatzy', player2.yatzy)
        updateScoreboardValue('p2-total', player2.getTotalSum())
    }
}

function updateScoreboardValue(id, value) {
    document.getElementById(id).innerHTML = value;
}

function initiatePlayers() {
    player1 = new Player(null);
    player2 = new Player(null);
    
    while (player1.name === undefined || player1.name === null || player1.name === "") {
        player1.name = prompt("Enter player 1's name: ");
    }
    
    while (player2.name === undefined || player2.name === null || player2.name === "") {
        player2.name = prompt("Enter player 2's name: ");
    }
    
    document.getElementById('p1-name').innerHTML = player1.name;
    document.getElementById('p2-name').innerHTML = player2.name;
}

function lockPickedCombinations(player) {
    let pickedCombinations = player.PickedCombinations;

    for(let i = 0; i < pickedCombinations.length; i++) {
        document.getElementById(pickedCombinations[i]).disabled = true;
    }
}

function toggleScoreboard() {
    document.getElementsByClassName("scoreboard")[0].style.display = scoreboardIsOpen ? 'none' : 'flex';
    scoreboardIsOpen = !scoreboardIsOpen;
}