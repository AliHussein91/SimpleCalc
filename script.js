// Getting HTML Elements

const screen = document.querySelector(".displayValue");
const nmbrBtns = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".ops");

// Acceptable values

const numKeys = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Global Variables

let result = null,
  num = null,
  op = null,
  entry = [];

// Update the calculator display

function updateDisplay(value) {
  screen.innerHTML = value;
}

//  Capturing keyboard number buttons

document.body.onkeydown = function (e) {
  captureInput(e.key);
};

// Capturing on screen calculator number buttons

nmbrBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    captureInput(btn.getAttribute("value"));
  });
});

// Capturing on screen calculator operations and clear buttons

operations.forEach((operation) => {
  operation.addEventListener("click", () => {
    captureOps(operation.getAttribute("id"));
  });
});

// Capturing keyboard operations and clear buttons

// document.body.onkeydown = function(e){
//     captureOps(e.key);
// }

// Capturing and processing operations

function captureOps(value) {
  if (value === "clear") {
    clear();
  } else if (value === "result") {
    showResult();
  } else {
    evaluateStates(value);
  }
}

// Recording input into variables and calling the display update

function captureInput(value) {
  // Evaluating entered values
  if (numKeys.includes(value) && entry.length <= 16) {
    // Evaluating zero value to display as "0"
    if (Number(entry.join("")) === 0 && value === "0") {
      return;
    } else {
      entry.push(value);
      updateDisplay(entry.join(""));
    }
  }
}

// Calculating result

function calculate(num1, num2, op) {
  switch (op) {
    case "add":
      result = num1 + num2;
      break;
    case "sub":
      result = num1 - num2;
      break;
    case "divide":
      result = num1 / num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
  }
}

// Clearing display and variables

function clear() {
  result = null;
  num = null;
  op = null;
  entry = [];
  updateDisplay("0");
}

function evaluateStates(value) {
  if (typeof result === "number" && op !== null && typeof num === "number") {
    showResult();
  }
  if (num === null && op !== null) {
    num = Number(entry.join(""));
    showResult();
  }
  if (result === null) {
    result = Number(entry.join(""));
  }
  op = value;
  entry = [];
}

// Showing result value on display

function showResult() {
  if (
    typeof result === "number" &&
    typeof num === "number" &&
    op !== "result" &&
    op !== "clear"
  ) {
    calculate(result, num, op);
  } else if (result === null) {
    result = Number(entry.join(""));
  } else if (
    typeof result === "number" &&
    num === null &&
    op !== null &&
    entry.length > 0
  ) {
    num = Number(entry.join(""));
    showResult();
  }
  num = null;
  op = null;
  entry = [result];
  updateDisplay(result);
}
