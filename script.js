function add(a, b) {
     return a + b;
}

function subtract(a, b) {
     return a - b;
}

function multiply(a, b) {
     return a * b;
}

function divide(a, b) {
     return a / b;
}

function operate(symbol, a, b) {
     let aInt = parseFloat(a);
     let bInt = parseFloat(b);
     switch (symbol) {
          case "+":
               return add(aInt, bInt);
          case "-":
               return subtract(aInt, bInt);
          case "x":
               return multiply(aInt, bInt);
          case "÷":
               return divide(aInt, bInt);
     }
}

function flash(){
     screen.querySelector("h2").classList.toggle("disappear");
}

class calculatorObject {
     constructor(symbol, value) {
          this.symbol = symbol;
          this.value = value;
     }
}


let currentOperator = "";
let currentDisplay = 0;
let currentCalculatorObject;
let hasInputedValue = false;
let hasDecimal = false;

const screen = document.querySelector(".screen");

document.querySelectorAll(".number").forEach((number) => {
     number.addEventListener("click", function (e) {
          let tempValue = screen.querySelector("h2").textContent.replace(/\s/g, '');
          if (tempValue.length < 8 || !hasInputedValue) {
               if (!hasInputedValue) {
                    tempValue = this.firstElementChild.textContent;
                    hasInputedValue = true;
               }
               else {
                    tempValue += this.firstElementChild.textContent;
               }
          }
          screen.querySelector("h2").textContent = "" + tempValue;
     });
});

document.querySelectorAll(".operator").forEach((operator) => {
     operator.addEventListener("click", function (e) {
          if (currentCalculatorObject == null) {
               currentCalculatorObject = new calculatorObject(this.firstElementChild.textContent, screen.firstElementChild.textContent, );
               hasInputedValue = false;
          }
     });
});

document.querySelector(".equals").addEventListener("click", function(e) {
     if (currentCalculatorObject != null)
     {    
          const finalVariable = operate(currentCalculatorObject.symbol, currentCalculatorObject.value, screen.querySelector("h2").textContent);
          screen.querySelector("h2").textContent = finalVariable;
          currentCalculatorObject = null;
          hasInputedValue = false;
     }
});

document.querySelector("#clears").addEventListener("click", function(e){
     screen.querySelector("h2").textContent = "" + 0;
     currentCalculatorObject = null;
     hasInputedValue = false;
});

document.querySelector("#back").addEventListener("click", function(e){
     let screenText = screen.querySelector("h2").textContent;
     if (screenText.length <= 1)
     {
          screen.querySelector("h2").textContent = 0;
          hasInputedValue = false; 
     }
     else
     {
          screen.querySelector("h2").textContent =  screen.querySelector("h2").textContent.slice(0, screen.querySelector("h2").textContent.length - 1);
     }
});

document.querySelector("#negative").addEventListener("click", function(e){
     if (screen.querySelector("h2").textContent !== 0 && screen.querySelector("h2").textContent.slice(0, 1) !== "-")
     {
          screen.querySelector("h2").textContent = "-" + screen.querySelector("h2").textContent;
     }
     else
     {
          screen.querySelector("h2").textContent = screen.querySelector("h2").textContent.slice(1, screen.querySelector("h2").textContent.length);
     }
});

document.querySelector("#decimal").addEventListener("click", function(e){
     if (!hasDecimal)
     {
          
     }
});