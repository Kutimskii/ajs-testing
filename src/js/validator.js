export default function validate(cardNumber) {
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
      i > 9 ? (resultSum += i - 9) : (resultSum += i);
    } else {
      resultSum += i;
    }
  });
  if (resultSum % 10 === 0) {
    return true;
  } else return false;
}
