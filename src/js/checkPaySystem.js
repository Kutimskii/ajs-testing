export default function checkPaySystem(num) {
  document.querySelectorAll(".card").forEach((el) => {
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
