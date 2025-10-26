# MyShop - E-commerce Platform

Full-stack e-commerce platform built with React (Frontend) and Express (Backend).

## 📁 Project Structure

```
myshop/
│
├── server/                     # 🧠 Backend (Express)
│   ├── controllers/            # Xử lý request → gọi service → trả response
│   ├── models/                 # Mongoose schema (hoặc ORM khác)
│   ├── routes/                 # Định nghĩa endpoint
│   ├── services/               # Logic nghiệp vụ (business logic)
│   ├── utils/                  # Hàm tiện ích: JWT, email, v.v.
│   ├── config/                 # Kết nối DB, dotenv, etc.
│   ├── app.js                  # Cấu hình Express
│   └── server.js               # Chạy server
│
├── client/                     # 💻 Frontend (React + Vite)
│   ├── src/
│   │   ├── components/         # Component dùng lại (Button, Navbar,…)
│   │   ├── pages/              # Trang chính (Home, Product,…)
│   │   ├── api/                # Gọi API (axios, fetch,…)
│   │   ├── hooks/              # Custom hook tái sử dụng
│   │   ├── utils/              # Format, validate, helper chung
│   │   ├── styles/             # CSS, SCSS, Tailwind,…
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
├── shared/                     # 🔄 Code dùng chung (nếu cần)
│   ├── constants.js
│   └── schemas.js
│
├── package.json                # Script tổng
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Sales_Website
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   - Copy `server/.env.example` to `server/.env`
   - Update the environment variables

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the Frontend Client**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on http://localhost:3000

## 🛠️ Tech Stack

### Backend
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

### Frontend
- React
- Vite
- React Router
- Axios

## 📝 License

MIT