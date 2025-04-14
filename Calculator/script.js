let currentInput = ''

function appendToDisplay(value) {
    let operators = [" + ", " - ", " * ", " / "]
    let isOperator = false
    for (let i = 0; i < operators.length; i++) {
        if (value === operators[i]) {
            isOperator = true
            break
        }
    }

    if (isOperator && currentInput === "") {
        return
    }

    let endsWithOperator = false
    for (let j = 0; j < operators.length; j++) {
        if (currentInput.slice(-3) === operators[j]) {
            endsWithOperator = true
        }
    }

    if (isOperator && endsWithOperator) {
        currentInput = currentInput.slice(0, currentInput.length - 3) + value
    } else {
        currentInput += value
    }

    document.getElementById('display').value = currentInput
}



function clearDisplay() {
    currentInput = ''
    document.getElementById('display').value = ''
}

function calculate() {
    let result = eval(currentInput) // eval ასრულებს მიმატება/გამოკლება/გაყოფა/გამრავლების ოპერაციებს სტრინგში "5 + 5" = "10"
    document.getElementById('display').value = result
    currentInput = result.toString() // tostring - ს გადაჰყავს ინფორმაცია სტრინგში
}

document.getElementById('btn7').onclick = function () {
    appendToDisplay('7')
}
document.getElementById('btn8').onclick = function () {
    appendToDisplay('8')
}
document.getElementById('btn9').onclick = function () {
    appendToDisplay('9')
}
document.getElementById('btnDiv').onclick = function () {
    appendToDisplay(' / ')
}
document.getElementById('btn4').onclick = function () {
    appendToDisplay('4')
}
document.getElementById('btn5').onclick = function () {
    appendToDisplay('5')
}
document.getElementById('btn6').onclick = function () {
    appendToDisplay('6')
}
document.getElementById('btnMul').onclick = function () {
    appendToDisplay(' * ')
}
document.getElementById('btn1').onclick = function () {
    appendToDisplay('1')
}
document.getElementById('btn2').onclick = function () {
    appendToDisplay('2')
}
document.getElementById('btn3').onclick = function () {
    appendToDisplay('3')
}
document.getElementById('btnSub').onclick = function () {
    appendToDisplay(' - ')
}
document.getElementById('btn0').onclick = function () {
    appendToDisplay('0')
}
document.getElementById('clear').onclick = function () {
    clearDisplay()
}
document.getElementById('equals').onclick = function () {
    calculate()
}
document.getElementById('btnAdd').onclick = function () {
    appendToDisplay(' + ')
}
