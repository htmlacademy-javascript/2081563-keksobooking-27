import { FILE_TYPES } from './const.js';

const avatarUploadElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoUploadElement = document.querySelector('.ad-form__upload input[type=file]');
const photoPreviewElement = document.querySelector('.ad-form__photo');
const imageElement = document.createElement('img');
imageElement.style.width = '70px';
imageElement.style.height = '70px';
imageElement.style.backgroundColor = 'transparent';

const clearAvatar = () => {
  avatarPreviewElement.src = 'img/muffin-grey.svg';
};

const clearPhoto = () => {
  imageElement.remove();
};

const previewImage = () => {
  avatarUploadElement.addEventListener('change', () => {
    const file = avatarUploadElement.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((el) => fileName.endsWith(el));

      if (matches) {
        avatarPreviewElement.src = URL.createObjectURL(file);
      }
    }
  });

  photoUploadElement.addEventListener('change', () => {
    const file = photoUploadElement.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((el) => fileName.endsWith(el));
      if (matches) {
        photoPreviewElement.append(imageElement);
        imageElement.src = URL.createObjectURL(file);
      }
    }
  });
};

export {previewImage, clearAvatar, clearPhoto};
