/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/validator.js
function validate(cardNumber) {
  let resultSum = 0;
  cardNumber.forEach((element, index) => {
    let i = +element;
    let odd = null;
    if (cardNumber.length % 2 === 0) {
      odd = index % 2 === 0;
    } else {
      odd = index % 2 !== 0;
    }
    if (odd) {
      i = i * 2;
      i > 9 ? resultSum += i - 9 : resultSum += i;
    } else {
      resultSum += i;
    }
  });
  if (resultSum % 10 === 0) {
    return true;
  } else return false;
}
;// CONCATENATED MODULE: ./src/js/checkPaySystem.js
function checkPaySystem(num) {
  document.querySelectorAll(".card").forEach(el => {
    el.classList.remove("active");
  });
  const firstNum = +num[0];
  const firstTwoNum = +num.slice(0, 2).join("");
  const firstFourNum = +num.slice(0, 4).join("");
  switch (firstNum) {
    case 2:
      document.querySelector(".mir").classList.add("active");
      break;
    case 3:
      document.querySelector(".american-express").classList.add("active");
      break;
    case 4:
      document.querySelector(".visa").classList.add("active");
      break;
    default:
      break;
  }
  switch (firstTwoNum) {
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
      document.querySelector(".master-card").classList.add("active");
      break;
    case 62:
    case 88:
      document.querySelector(".union-pay").classList.add("active");
      break;
    default:
      break;
  }
  switch (firstFourNum) {
    case 5018:
    case 5020:
    case 5038:
    case 5893:
    case 6304:
    case 6761:
    case 6762:
    case 6763:
    case 6759:
      document.querySelector(".maestro").classList.add("active");
      break;
    default:
      break;
  }
}
;// CONCATENATED MODULE: ./src/js/Actions.js


class DomActions {
  constructor() {}
  static init() {
    document.querySelector("body").innerHTML = `
    <div class="container">
      <h3 class = "header">Check your credit card number</h3>
      <ul class = "cardlist">
        <li class = "card maestro"></li>
        <li class = "card american-express"></li>
        <li class = "card visa"></li>
        <li class = "card master-card"></li>
        <li class = "card mir"></li>
        <li class = "card union-pay"></li>
      </ul>
      <form class="card-form">
      <input id="numberCard-input" type="text" placeholder="write your number">
      <button class="btn validate"> Check to validate </button> 
      <button class="btn reset-number"> Reset </button>
      </form>
    </div>
`;
    this.btnValid = document.querySelector(".validate");
    this.btnReset = document.querySelector(".reset-number");
    this.btnReset.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll(".card").forEach(el => {
        el.classList.remove("active");
      });
      document.querySelector("#numberCard-input").value = "";
    });
  }
  static check() {
    this.btnValid.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector("#numberCard-input").classList.remove("valid");
      document.querySelector("#numberCard-input").classList.remove("invalid");
      const number = document.querySelector("#numberCard-input").value.replaceAll(" ", "").split("");
      console.log(number);
      if (number.length < 13) {
        return alert("Слишком короткий номер");
      }
      const result = validate(number);
      if (result) {
        document.querySelector("#numberCard-input").classList.add("valid");
        return checkPaySystem(number);
      } else {
        document.querySelector("#numberCard-input").classList.add("invalid");
        return alert("В номере ошибка");
      }
    });
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

DomActions.init();
DomActions.check();
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;