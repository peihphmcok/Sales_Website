# Sales Website

A full-stack template with a React (Vite) frontend and Node.js + Express + MongoDB backend.

## Structure

- client/ — React app (Vite)
- server/ — Express API with MongoDB (Mongoose)

## Getting started

### Prerequisites
- Node.js 18+
- MongoDB running locally or a connection string

### Client
```bash
cd client
npm install
npm run dev
```

### Server
Create a `.env` file in `server/` with:
```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/sales_website
JWT_SECRET=change_me
```
Then install and start:
```bash
cd server
npm install
npm run dev
```

- API base URL: `http://localhost:4000/api`
- Client base URL: `http://localhost:5173`

## Notes
- Update `VITE_API_URL` in client environment if backend runs elsewhere.
