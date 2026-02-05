# Ros Watch Shop (Frontend)

Website bán đồng hồ - giao diện khách hàng và admin.

## Yêu cầu

- Node.js (khuyến nghị 18+)
- npm

## Cài đặt và chạy

```bash
npm install
cp .env.template .env
# Chỉnh .env: REACT_APP_API_URL, REACT_APP_IMAGE_URL trỏ tới backend
npm start
```

Mở [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
```

## Cấu hình

- `.env`: copy từ `.env.template`, điền API URL và Image URL của backend.
- VNPAY (thanh toán online): xem `HUONG_DAN_NGROK_VNPAY.md`.
