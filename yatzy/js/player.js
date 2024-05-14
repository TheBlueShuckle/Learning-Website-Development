class Player {
    constructor() {
        this.name;

        this.ones = 0;
        this.twos = 0;
        this.threes = 0;
        this.fours = 0;
        this.fives = 0;
        this.sixes = 0;
        
        this.onePair = 0;
        this.twoPairs = 0;
        this.threeOfAKind = 0;
        this.fourOfAKind = 0;
        this.smallStraight = 0;
        this.largeStraight = 0;
        this.fullHouse = 0;
        this.chance = 0;
        this.yatzy = 0;
        this.total = 0;

        this.pickedCombinations = [];
    }

    get PickedCombinations() {
        return this.pickedCombinations;
    }

    getBonus() {
        if (this.getSumUpperHalf > 63) {
            return 50;
        }

        return 0;
    }

    getSumUpperHalf() {
        return this.ones + this.twos + this.threes + this.fours + this.fives + this.sixes;
    }

    getTotalSum() {
        return this.getSumUpperHalf() + this.onePair + this.twoPairs + this.threeOfAKind + this.fourOfAKind + this.smallStraight + this.largeStraight + this.fullHouse + this.chance + this.yatzy + this.getBonus();
    }
}