const LINK_GET = 'https://27.javascript.pages.academy/keksobooking/data';
const LINK_POST = 'https://27.javascript.pages.academy/keksobooking';

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

export {getRandomNumber , LINK_GET, LINK_POST};
