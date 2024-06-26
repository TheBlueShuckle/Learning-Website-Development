const rollingTimeMilliseconds = 2000;
const rollingSpeedMilliseconds = 50;
const maxRollsPerTurn = 3;
const totalCombos = 15;
let rollingDice;
let scoreboardIsOpen = false;
let turn = 1;
let diceThrowCount = 0;
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
document.getElementById('end-turn-button').disabled = true;
unlockAllDice();
initiatePlayers();
continuallyRollDice();
changeThrowsLeftText();

for (let i = 0; i < document.querySelectorAll('.score-button').length; i++) {
    document.querySelectorAll('.score-button')[i].addEventListener("click", function() {
        changePlayer(i);
    });
}

function changePlayer(i) {
    let buttonId = document.getElementsByClassName('score-button')[i].id;

    addScoreToPlayer(buttonId);
    getCurrentPlayer().pickedCombinations.push(buttonId);
    updateScoreboard();
    unlockAllDice();    

    for (let i = 0; i < document.querySelectorAll('.score-button').length; i++) {
        document.querySelectorAll('.score-button')[i].disabled = false;
    }

    resetMainButtons();

    turn++;
    diceThrowCount = 0;

    changeCurrentTurnText();
    changeThrowsLeftText();
    document.getElementById('main-ui').style.display = 'block';
    document.getElementById('choose-ui').style.display =  'none';

    if (checkIfGameIsDone()) {
        let winner = player1.getTotalSum() > player2.getTotalSum() ? player1.name : player2.name;

        if (player1.getTotalSum() === player2.getTotalSum()) {
            alert('Game is over! ' + "Tie!")
        }

        else {
            alert('Game is over!  ' + winner + " won!")
        }
    }
    
    continuallyRollDice();
}

function changeThrowsLeftText() {
    let throwsLeftText = document.getElementById('throws-left-text');
    let throwsLeft = 3 - diceThrowCount;

    if (throwsLeft !== 1) {
        throwsLeftText.innerHTML = throwsLeft + " throws left";
    }

    else {
        throwsLeftText.innerHTML = throwsLeft + " throw left";
    }
}

function changeCurrentTurnText() {
    let playerTurnText = document.getElementById('players-turn-text');
    let playerCombinationText = document.getElementById('player-combination-screen-text');
    playerTurnText.innerHTML = "Turn " + turn + ": " + getCurrentPlayer().name + "'s turn";
    playerCombinationText.innerHTML = getCurrentPlayer().name
}

function resetMainButtons() {
    let rollButton = document.getElementById('roll-button');
    let endTurnButton = document.getElementById('end-turn-button');

    rollButton.disabled = false;
    endTurnButton.disabled = true;
}

function unlockAllDice() {
    dice.forEach(die => {
        die.checkbox.checked = false;
    });
}

function continuallyRollDice() {
    dice.forEach(function(dice) {
        dice.checkbox.disabled = true;
        dice.image.alt = "";
    });
    rollingDice = setInterval(function() {
        dice.forEach(randomizeDieValue);
    }, rollingSpeedMilliseconds);
}

function rollDice() {
    let rollButton = document.getElementById('roll-button');
    let endTurnButton = document.getElementById('end-turn-button');
    diceThrowCount++;
    changeThrowsLeftText();

    dice.forEach(function(dice) {
        dice.image.alt = "";
    });

    rollButton.disabled = true;
    endTurnButton.disabled = true;

    if (diceThrowCount === 1) {
        clearInterval(rollingDice);
        rollingDice = null;
        rollButton.disabled = false;
        endTurnButton.disabled = false;

        dice.forEach(function(dice) {
            dice.checkbox.disabled = false;
            dice.image.alt = dice.value;
        });
    }

    else if (!allDiceLocked(dice)){
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
                    dice.image.alt = dice.value;
                });

                if (diceThrowCount === maxRollsPerTurn) {
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
         
        dice.push(new Dice(diceElements[i], image, 1));
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
    if (!die.checkbox.checked) {
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        die.value = randomNumber;
        die.image.src = 'images/dice-' + randomNumber + '.png';
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
    lockPickedCombinations(getCurrentPlayer());

    displayValues(valueCounter);
}

function checkIfGameIsDone() {
    let pickedCombinationsPlayer1 = player1.PickedCombinations;
    let pickedCombinationsPlayer2 = player2.pickedCombinations;

    if (pickedCombinationsPlayer1.length === totalCombos || pickedCombinationsPlayer2 === totalCombos) {
        return true;
    }

    return false;
}

function displayValues(valueCounter) {
    setPointTextById('ones-button', valueCounter.ValueCounts[0]);
    setPointTextById('twos-button', 2 * valueCounter.ValueCounts[1]);
    setPointTextById('threes-button', 3 * valueCounter.ValueCounts[2]);
    setPointTextById('fours-button', 4 * valueCounter.ValueCounts[3]);
    setPointTextById('fives-button', 5 * valueCounter.ValueCounts[4]);
    setPointTextById('sixes-button', 6 * valueCounter.ValueCounts[5]);

    setPointTextById('one-pair-button', valueCounter.getOnePairValue());
    setPointTextById('two-pairs-button', valueCounter.getTwoPairsValue());
    setPointTextById('three-of-a-kind-button', valueCounter.getThreeOfAKindValue());
    setPointTextById('four-of-a-kind-button', valueCounter.getFourOfAKindValue());
    setPointTextById('small-straight-button', valueCounter.getSmallStraightValue());
    setPointTextById('large-straight-button', valueCounter.getLargeStraightValue());
    setPointTextById('full-house-button', valueCounter.getFullHouseValue());
    setPointTextById('chance-button', valueCounter.getChanceValue());
    setPointTextById('yatzy-button', valueCounter.getYatzyValue());
}

function setPointTextById(id, value) {
    document.getElementById(id).innerHTML = value + ' pts';
}

function addScoreToPlayer(id) {
    switch(id) {
        case 'ones-button': 
            getCurrentPlayer().ones = valueCounter.ValueCounts[0];
            break;
        case 'twos-button': 
            getCurrentPlayer().twos = 2 * valueCounter.ValueCounts[1];
            break;
        case 'threes-button': 
            getCurrentPlayer().threes = 3 * valueCounter.ValueCounts[2];
            break;
        case 'fours-button': 
            getCurrentPlayer().fours = 4 * valueCounter.ValueCounts[3];
            break;
        case 'fives-button': 
            getCurrentPlayer().fives = 5 * valueCounter.ValueCounts[4];
            break;
        case 'sixes-button': 
            getCurrentPlayer().sixes = 6 * valueCounter.ValueCounts[5];
            break;
        case 'one-pair-button': 
            getCurrentPlayer().onePair = valueCounter.getOnePairValue();
            break;
        case 'two-pairs-button': 
            getCurrentPlayer().twoPairs = valueCounter.getTwoPairsValue();
            break;
        case 'three-of-a-kind-button': 
            getCurrentPlayer().threeOfAKind = valueCounter.getThreeOfAKindValue();
            break;
        case 'four-of-a-kind-button': 
            getCurrentPlayer().fourOfAKind = valueCounter.getFourOfAKindValue();
            break;
        case 'small-straight-button': 
            getCurrentPlayer().smallStraight = valueCounter.getSmallStraightValue();
            break;
        case 'large-straight-button': 
            getCurrentPlayer().largeStraight = valueCounter.getLargeStraightValue();
            break;
        case 'full-house-button': 
            getCurrentPlayer().fullHouse = valueCounter.getFullHouseValue();
            break;
        case 'chance-button': 
            getCurrentPlayer().chance = valueCounter.getChanceValue();
            break;
        case 'yatzy-button': 
            getCurrentPlayer().yatzy = valueCounter.getYatzyValue();
            break;
    }
}

function getCurrentPlayer() {
    return turn % 2 === 0 ? player2 : player1;
}

function updateScoreboard() {
    let currentPlayer = getCurrentPlayer() === player1 ? 'p1' : 'p2';

    updateScoreboardValue(currentPlayer + '-ones', getCurrentPlayer().ones);
    updateScoreboardValue(currentPlayer + '-twos', getCurrentPlayer().twos);
    updateScoreboardValue(currentPlayer + '-threes', getCurrentPlayer().threes);
    updateScoreboardValue(currentPlayer + '-fours', getCurrentPlayer().fours);
    updateScoreboardValue(currentPlayer + '-fives', getCurrentPlayer().fives);
    updateScoreboardValue(currentPlayer + '-sixes', getCurrentPlayer().sixes);
    updateScoreboardValue(currentPlayer + '-top-sum', getCurrentPlayer().getSumUpperHalf());
    updateScoreboardValue(currentPlayer + '-bonus', getCurrentPlayer().getBonus());
    updateScoreboardValue(currentPlayer + '-one-pair', getCurrentPlayer().onePair);
    updateScoreboardValue(currentPlayer + '-two-pairs', getCurrentPlayer().twoPairs);
    updateScoreboardValue(currentPlayer + '-three-of-a-kind', getCurrentPlayer().threeOfAKind);
    updateScoreboardValue(currentPlayer + '-four-of-a-kind', getCurrentPlayer().fourOfAKind);
    updateScoreboardValue(currentPlayer + '-small-straight', getCurrentPlayer().smallStraight);
    updateScoreboardValue(currentPlayer + '-large-straight', getCurrentPlayer().largeStraight);
    updateScoreboardValue(currentPlayer + '-full-house', getCurrentPlayer().fullHouse);
    updateScoreboardValue(currentPlayer + '-chance', getCurrentPlayer().chance);
    updateScoreboardValue(currentPlayer + '-yatzy', getCurrentPlayer().yatzy);
    updateScoreboardValue(currentPlayer + '-total', getCurrentPlayer().getTotalSum());
}

function updateScoreboardValue(id, value) {
    document.getElementById(id).innerHTML = value;
}

function initiatePlayers() {
    player1 = new Player();
    player2 = new Player();
    
    let nameIsEmpty = player1.name === undefined || player1.name === null || player1.name === "";

    while (nameIsEmpty) {
        let name = prompt("Enter player 1's name: ");

        nameIsEmpty = name === undefined || name === null || name === "";

        if (!nameIsEmpty) {
            player1.name = name.length > 12 ? name.slice(0, 12) : name;
        }
    }
    
    nameIsEmpty = player2.name === undefined || player2.name === null || player2.name === "";

    while (nameIsEmpty) {
        let name = prompt("Enter player 2's name: ");

        nameIsEmpty = name === undefined || name === null || name === "";   

        if (!nameIsEmpty) {
            player2.name = name.length > 12 ? name.slice(0, 12) : name;
        }
    }
    
    document.getElementById('p1-name').innerHTML = player1.name;
    document.getElementById('p2-name').innerHTML = player2.name;

    changeCurrentTurnText();
}

function lockPickedCombinations(player) {
    let pickedCombinations = player.PickedCombinations;

    for(let i = 0; i < pickedCombinations.length; i++) {
        document.getElementById(pickedCombinations[i]).disabled = true;
    }
}

function toggleScoreboard() {
    document.getElementsByClassName("scoreboard")[0].style.display = scoreboardIsOpen ? 'none' : 'block';
    document.getElementsByClassName("darken-background")[0].style.display = scoreboardIsOpen ? 'none' : 'block';
    document.getElementById('open-scoreboard-button').style.display = scoreboardIsOpen ? 'block' : 'none';
    scoreboardIsOpen = !scoreboardIsOpen;
}