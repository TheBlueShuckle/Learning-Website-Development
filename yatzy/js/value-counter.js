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
        console.log(this.valueCounts[0] + ", " + this.valueCounts[1] + ", " + this.valueCounts[2] + ", " + this.valueCounts[3] + ", " + this.valueCounts[4] + ", " + this.valueCounts[5]);
    }

    getOnePairValue() {
        let calculatedValue = 0;
    
        for (let i = 0; i < this.valueCounts.length; i++) {
            
            if (this.valueCounts[i] === 2) {
                calculatedValue = 2 * (i + 1);
            }
        }
    
        return calculatedValue;
    }
    
    getTwoPairsValue() {
        let calculatedValue = 0;
    
        for (let i = 0; i < this.valueCounts.length; i++) {
            if (this.valueCounts[i] === 2) {
                for (let j = 0; j < this.valueCounts.length; j++) {
                    if (j !== i && this.valueCounts[j] === 2) {
                        calculatedValue = 2 * ((j + 1) + (i + 1));
                        break;
                    }
                }
                break;
            }
        }
    
        return calculatedValue;
    }
    
    getThreeOfAKindValue() {
        let calculatedValue = 0;
    
        for (let i = 0; i < this.valueCounts.length; i++) {
            if (this.valueCounts[i] === 3) {
                calculatedValue = 3 * (i + 1);
            }
        }
    
        return calculatedValue;
    }
    
    getFourOfAKindValue() {
        let calculatedValue = 0;
    
        for (let i = 0; i < this.valueCounts.length; i++) {
            if (this.valueCounts[i] === 4) {
                calculatedValue = 4 * (i + 1);
            }
        }
    
        return calculatedValue;
    }
    
    getSmallStraightValue() {
        let values = this.valueCounts;
        let calculatedValue = 0;
    
        if (values[0] === 1 && values[1] === 1 && values[2] === 1 && values[3] === 1 && values[4] === 1){
            calculatedValue = 15;
        }
    
        return calculatedValue;
    }
    
    getLargeStraightValue() {
        let values = this.valueCounts;
        let calculatedValue = 0;
    
        if (values[1] === 1 && values[2] === 1 && values[3] === 1 && values[4] === 1 && values[5] === 1){
            calculatedValue = 30;
        }
    
        return calculatedValue;
    }
    
    getFullHouseValue() {
        let calculatedValue = 0;
    
        for (let i = 0; i < this.valueCounts.length; i++) {
            if (this.valueCounts[i] === 3) {
                for (let j = 0; j < this.valueCounts.length; j++) {
                    if (this.valueCounts[i] === 2) {
                        calculatedValue = 3 * (i + 1) + 2 * (j + 1);
                        break;
                    }
                }
                break;
            }
        }
    
        return calculatedValue;
    }
    
    getChanceValue() {
        let calculatedValue = 0;
    
        for (let i = 0; i < this.valueCounts.length; i++) {
            calculatedValue += (i + 1) * this.valueCounts[i];
        }
    
        return calculatedValue;
    }
    
    getYatzyValue() {
        let calculatedValue = 0;
    
        for (let i = 0; i < this.valueCounts.length; i++) {
            if (this.valueCounts[i] === 5) {
                calculatedValue = 50;
            }
        }
    
        return calculatedValue;
    }
}