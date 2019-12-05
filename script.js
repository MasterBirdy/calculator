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

function calculate() {
     if (!isOverfilled) {
          if (hasDecimal && screen.querySelector("h2").textContent.indexOf(".") === screen.querySelector("h2").textContent.length - 1) {
               screen.querySelector("h2").textContent += "0";
          }
          if (currentCalculatorObject != null) {
               let aVariable = operate(currentCalculatorObject.symbol, currentCalculatorObject.value, screen.querySelector("h2").textContent);
               screen.querySelector("h2").textContent = format(aVariable);
               hasInputedValue = false;
          }
     }
}

function format(theVariable){
     let finalVariable = theVariable;
     if ((finalVariable + "").includes(".")) {
          hasDecimal = true;
     }
     else {
          hasDecimal = false;
     }
     if (hasDecimal && ((finalVariable + "").length - (finalVariable + "").indexOf(".")) >= 3) {
          finalVariable = (finalVariable + "").slice(0, (finalVariable + "").indexOf(".") + 2);
     }
     if (Math.abs(finalVariable) > max) {
          isOverfilled = true;
          screen.querySelector("h3").classList.remove("disappear");
          finalVariable = (finalVariable + "").slice(0, 8);
     }
     else if ((finalVariable + "").length > 8 )
     {
          finalVariable = (finalVariable + "").slice(0, 8);
     }
     return finalVariable;
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
let isOverfilled = false;
const max = 99999999;

const screen = document.querySelector(".screen");

document.querySelectorAll(".number").forEach((number) => {
     number.addEventListener("click", function (e) {
          if (!isOverfilled) {
               let tempValue = screen.querySelector("h2").textContent.replace(/\s/g, '');
               if (tempValue.length < 8 || !hasInputedValue) {
                    if (!(tempValue.includes(".") && this.firstElementChild.textContent === "." && hasInputedValue))
                    {
                         if (!hasInputedValue) {
                              tempValue = this.firstElementChild.textContent;
                              hasInputedValue = true;
                         }
                         else {
                              tempValue += this.firstElementChild.textContent;
                         }
                    }
               }
               screen.querySelector("h2").textContent = "" + tempValue;
          }
     });
});

document.querySelectorAll(".operator").forEach((operator) => {
     operator.addEventListener("click", function (e) {
          if (!isOverfilled) {
               if (hasDecimal && screen.querySelector("h2").textContent.indexOf(".") === screen.querySelector("h2").textContent.length - 1) {
                    screen.querySelector("h2").textContent += "0";
               }
               if (currentCalculatorObject == null) {
                    currentCalculatorObject = new calculatorObject(this.firstElementChild.textContent, screen.firstElementChild.textContent);
                    hasInputedValue = false;
               }
               else {
                    calculate();
                    currentCalculatorObject = new calculatorObject(this.firstElementChild.textContent, screen.firstElementChild.textContent);
               }
          }
     });
});

document.querySelector(".equals").addEventListener("click", function (e) {
     calculate();
     currentCalculatorObject = null;
});

document.querySelector("#clears").addEventListener("click", function (e) {
     screen.querySelector("h2").textContent = "" + 0;
     currentCalculatorObject = null;
     hasInputedValue = false;
     isOverfilled = false;
     screen.querySelector("h3").classList.add("disappear");
});

document.querySelector("#back").addEventListener("click", function (e) {
     if (!isOverfilled) {
          let screenText = screen.querySelector("h2").textContent;
          if (screenText.length <= 1) {
               screen.querySelector("h2").textContent = 0;
               hasInputedValue = false;
          }
          else {
               screen.querySelector("h2").textContent = screen.querySelector("h2").textContent.slice(0, screen.querySelector("h2").textContent.length - 1);
          }
     }
});

document.querySelector("#negative").addEventListener("click", function (e) {
     if (!isOverfilled) {
          if (screen.querySelector("h2").textContent !== "0" && screen.querySelector("h2").textContent.slice(0, 1) !== "-") {
               screen.querySelector("h2").textContent = "-" + screen.querySelector("h2").textContent;
          }
          else {
               if (screen.querySelector("h2").textContent !== "0") {
                    screen.querySelector("h2").textContent = screen.querySelector("h2").textContent.slice(1, screen.querySelector("h2").textContent.length);
               }
          }
     }
});

document.querySelector("#squareroot").addEventListener("click", function(e){
     if (!isOverfilled)
     {
          let square = Math.sqrt(screen.querySelector("h2").textContent);
          screen.querySelector("h2").textContent = format(square);
          currentCalculatorObject = null;
     }
});

