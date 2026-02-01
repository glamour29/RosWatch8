const lamTronGia = (price) => {
  return Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const isUserLogin = () => !!localStorage.getItem('token');

function formatPhoneNumber(phoneNumber) {
  // Xóa khoảng trắng và dấu gạch nối hiện tại
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // Kiểm tra xem số điện thoại có đủ độ dài không
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);

  if (match) {
    // Nếu khớp, trả về số điện thoại đã định dạng
    return match[1] + ' ' + match[2] + ' ' + match[3];
  }

  // Nếu không khớp, trả về số điện thoại nguyên thủy
  return phoneNumber;
}

// Helper function để lấy image URL (hỗ trợ cả localhost và production)
const getImageUrl = (imagePath) => {
  const baseUrl = process.env.REACT_APP_IMAGE_URL || 'http://localhost:8080';
  if (!imagePath) return '';
  // Nếu imagePath đã có http/https thì return luôn
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${baseUrl}/image/${imagePath}`;
};

export { lamTronGia, isUserLogin, formatPhoneNumber, getImageUrl };
