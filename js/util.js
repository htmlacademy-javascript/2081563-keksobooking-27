const getRandomNumber = (min, max, round = 1) => {
  let result;

  if (min < 0 || max < 0 || round < 0) {
    result = NaN;
  }

  else if (min > max) {
    result = (Math.random() * (min - max) + min).toFixed(round);
  }

  result = (Math.random() * (max - min) + min).toFixed(round);

  return +result;
};

// const showAlertMessage = (message) => {
//   const containerElement = document.createElement('div');
//   containerElement.style.position = 'absolute';
//   containerElement.style.zIndex = '100';
//   containerElement.style.top = '0';
//   containerElement.style.left = '0';
//   containerElement.style.right = '0';
//   containerElement.style.backgroundColor = 'black';

//   document.body.append(containerElement);
// };
// showAlertMessage();

export {getRandomNumber};
