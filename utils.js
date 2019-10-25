function getByID(id) {
  return document.getElementById(id);
}

function padZerosLeft(number, width) {
  let result = number.toString().split('');
  let difference = width - result.length;
  
  for (let d = 0; d < difference; d++) {
    result.unshift('0');
  }
  
  return result.join('');
}

function getSweepAngle(number) {
  return 2 * Math.PI * (number / 60);
}

