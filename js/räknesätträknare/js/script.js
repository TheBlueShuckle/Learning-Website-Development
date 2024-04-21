document.getElementById('calculate').addEventListener('click', CalculateResult);

function CalculateResult() {
    var methodInput = document.getElementById('method').value;
    var number1 = parseFloat(document.getElementById('firstNumber').value);
    var number2 = parseFloat(document.getElementById('secondNumber').value);
    var result = document.getElementById('result1');

    if (methodInput === "+"){
        var sum = number1 + number2;
        result.innerHTML = "Summan = " + sum;
    }

    else if (methodInput === "-") {
        var difference = number1 - number2;
        result.innerHTML = "Differensen = " + difference;
    }

    else if (methodInput === "*") {
        var product = number1 * number2;
        result.innerHTML = "Produkten = " + product;
    }

    else if (methodInput === "/") {
        var quotent = number1 / number2;
        result.innerHTML = "Kvoten = " + quotent;
    }

    else {
        result.innerHTML = "Felaktigt tecken";
    }
}