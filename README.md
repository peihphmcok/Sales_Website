# Sales Website - Trạm Pha Chế ☕

Website bán hàng cà phê full-stack với React (Vite) frontend và Node.js + Express + MongoDB backend.

## 🏗️ Cấu Trúc Dự Án

- `client/` — React app (Vite + Tailwind CSS v4)
- `server/` — Express API với MongoDB (Mongoose)

## 📋 Yêu Cầu

- Node.js 18+
- MongoDB đang chạy locally hoặc connection string
- npm hoặc yarn

## 🚀 Hướng Dẫn Cài Đặt

### 1. Cài Đặt MongoDB

Đảm bảo MongoDB đang chạy trên máy của bạn:
```bash
# Kiểm tra MongoDB đã cài chưa
mongod --version

# Khởi động MongoDB (nếu chưa chạy)
mongod
```

### 2. Cài Đặt Server

```bash
cd server
npm install

# Tạo file .env (tùy chọn, có giá trị mặc định)
# PORT=5000
# MONGODB_URI=mongodb://127.0.0.1:27017/sales_website

# Khởi động server
npm run dev
```

Server sẽ chạy tại: `http://localhost:5000`

### 3. Thêm Dữ Liệu Mẫu (Seed Database)

```bash
# Trong thư mục server/
npm run seed
```

Script này sẽ thêm 12 sản phẩm cà phê mẫu vào database.

### 4. Cài Đặt Client

```bash
cd client
npm install

# Tạo file .env (tùy chọn)
# VITE_API_URL=http://localhost:5000/api

# Khởi động dev server
npm run dev
```

Client sẽ chạy tại: `http://localhost:5173`

## 🎯 API Endpoints

- `GET /api/products` - Lấy tất cả sản phẩm
- `POST /api/products` - Tạo sản phẩm mới

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- React 18
- Vite
- Tailwind CSS v4
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- CORS

## 📱 Tính Năng

- ✅ Hiển thị danh sách sản phẩm từ database
- ✅ Tìm kiếm sản phẩm
- ✅ Lọc sản phẩm theo danh mục
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

## 📝 Lưu Ý

- Server mặc định chạy trên port **5000**
- Client mặc định chạy trên port **5173**
- MongoDB connection string mặc định: `mongodb://127.0.0.1:27017/sales_website`
- Cần chạy MongoDB trước khi khởi động server

## 🐛 Troubleshooting

### Lỗi kết nối MongoDB
```bash
# Đảm bảo MongoDB đang chạy
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
# Hoặc chạy mongod trong terminal
```

### Lỗi CORS
- Đảm bảo server đã cài đặt và cấu hình CORS đúng
- Kiểm tra URL API trong client (`VITE_API_URL`)

### Port đã được sử dụng
```bash
# Thay đổi PORT trong server/.env
PORT=3000

# Hoặc kill process đang dùng port
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:5000 | xargs kill -9
```
