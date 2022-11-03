const LINK_GET = 'https://27.javascript.pages.academy/keksobooking/data';
const LINK_POST = 'https://27.javascript.pages.academy/keksobookin';

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

const showAlertMessage = () => {
  const containerElement = document.createElement('div');
  containerElement.style.position = 'absolute';
  containerElement.style.zIndex = '100';
  containerElement.style.top = '0';
  containerElement.style.left = '0';
  containerElement.style.right = '0';
  containerElement.style.backgroundColor = 'black';
  containerElement.style.height = '100px';
  containerElement.textContent = 'При загрузке данных с сервера произошла ошибка, пожалуйста перезагрузите страницу.';
  containerElement.style.color = 'white';
  containerElement.style.textAlign = 'center';
  containerElement.style.padding = '35px';
  containerElement.style.fontSize = '18px';

  document.body.append(containerElement);
};
const successElement = document.querySelector('#success').content.querySelector('.success');
const copySuccessElement = successElement.cloneNode(true);
const errorElement = document.querySelector('#error').content.querySelector('.error');
const copyErrorElement = errorElement.cloneNode(true);
const errorButtonElement = copyErrorElement.querySelector('.error__button');
function showErrorMessage () {
  document.body.append(copyErrorElement);
  const onClick = () => {
    copyErrorElement.remove();
    document.removeEventListener('click', onClick);
  };
  errorButtonElement.addEventListener('click', () => {
    copyErrorElement.remove();
  });
  document.addEventListener('click', onClick);
}
export {getRandomNumber , LINK_GET, LINK_POST, showAlertMessage, copySuccessElement, showErrorMessage};
