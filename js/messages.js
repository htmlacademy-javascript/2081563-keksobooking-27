const successElement = document.querySelector('#success').content.querySelector('.success');
const copySuccessElement = successElement.cloneNode(true);
const errorElement = document.querySelector('#error').content.querySelector('.error');
const copyErrorElement = errorElement.cloneNode(true);
const errorButtonElement = copyErrorElement.querySelector('.error__button');

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

const showErrorMessage = () => {
  document.body.append(copyErrorElement);
  const onEscError = (evt) => {
    if (evt.key === 'Escape') {
      copyErrorElement.remove();
      document.removeEventListener('keydown', onEscError);
    }
  };
  const onClickError = () => {
    copyErrorElement.remove();
    document.removeEventListener('click', onClickError);
  };
  errorButtonElement.addEventListener('click', () => {
    copyErrorElement.remove();
  });
  document.addEventListener('click', onClickError);
  document.addEventListener('keydown', onEscError);
};

const onEscDown = (evt) => {
  if (evt.key === 'Escape') {
    hiddenSuccesMessage();
  }
};

const onClick = () => {
  hiddenSuccesMessage();
};

const showSuccesMessage = () => {
  document.body.append(copySuccessElement);
  document.addEventListener('keydown', onEscDown);
  document.addEventListener('click', onClick);
};

function hiddenSuccesMessage() {
  copySuccessElement.remove();
  document.removeEventListener('keydown', onEscDown);
  document.removeEventListener('click', onClick);
}

export {showAlertMessage, showErrorMessage, showSuccesMessage};
