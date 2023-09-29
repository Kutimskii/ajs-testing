import validate from "./validator";
import checkPaySystem from "./checkPaySystem";
export default class DomActions {
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
    this.btnReset.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".card").forEach((el) => {
        el.classList.remove("active");
      });
      document.querySelector("#numberCard-input").value = "";
    });
  }
  static check() {
    this.btnValid.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector("#numberCard-input").classList.remove("valid");
      document.querySelector("#numberCard-input").classList.remove("invalid");
      const number = document
        .querySelector("#numberCard-input")
        .value.replaceAll(" ", "")
        .split("");
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
