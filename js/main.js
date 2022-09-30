function getRandomNumber(min, max, round = 1) {
  let result;

  if (min < 0 || max < 0 || round < 0) {
    result = NaN;
  }

  else if (min > max) {
    result = (Math.random() * (min - max + 1) + min).toFixed(round);
  }

  result = (Math.random() * (max - min + 1) + min).toFixed(round);

  return result;
}

getRandomNumber();
