const lamTronGia = (price) => {
  return Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const isUserLogin = () => !!localStorage.getItem('token');

function formatPhoneNumber(phoneNumber) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    return match[1] + ' ' + match[2] + ' ' + match[3];
  }
  return phoneNumber;
}

const getImageUrl = (imagePath) => {
  const baseUrl = process.env.REACT_APP_IMAGE_URL || 'http://localhost:8080';
  const path = Array.isArray(imagePath) ? imagePath[0] : imagePath;
  if (!path || typeof path !== 'string') return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${baseUrl}/image/${path}`;
};

export { lamTronGia, isUserLogin, formatPhoneNumber, getImageUrl };
