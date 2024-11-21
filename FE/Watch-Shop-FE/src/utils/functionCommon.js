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

export { lamTronGia, isUserLogin, formatPhoneNumber };
