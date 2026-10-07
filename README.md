# Loopify — Nền tảng cho mượn đồ ngắn hạn

## Mục tiêu
Loopify là giao diện demo cho một nền tảng cho mượn đồ ngắn hạn dành cho sinh viên và cộng đồng. Dự án này có cấu trúc rõ ràng hơn, dễ đọc, dễ sửa và có thể chạy trực tiếp bằng local web.

## Cấu trúc thư mục

```bash
loopify-optimized/
├── src/
│   ├── components/
│   ├── data/
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── types.ts
├── server/
│   ├── services/
│   └── server.ts
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── node_modules/
```

## Chạy dự án

### 1. Cài đặt package

```bash
npm install
```

### 2. Chạy dev server

```bash
npm run dev
```

Mặc định, ứng dụng chạy tại:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### 3. Build production

```bash
npm run build
```

### 4. Preview production

```bash
npm run preview
```

## API chính

- `GET /api/health` — kiểm tra trạng thái server
- `GET /api/items` — danh sách đồ cho mượn
- `POST /api/ai/pricing` — AI gợi ý giá thuê và cọc

## Ghi chú

- Dự án này tập trung vào cấu trúc code rõ ràng và dễ mở rộng.
- Để phát triển tiếp, bạn có thể thêm:
  - `src/components/ItemDetailModal.tsx`
  - `src/components/AuthModal.tsx`
  - `src/pages/DashboardPage.tsx`
  - `server/routes/` và `server/controllers/`

## Tác giả
Loopify Demo Project
