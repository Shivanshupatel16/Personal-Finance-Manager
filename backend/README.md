# Backend - Personal Finance Tracker (Enhanced)

## Setup
1. Copy `.env.example` to `.env` and fill `MONGO_URL` and `JWT_SECRET`.
2. `npm install`
3. `npm run start` (or `npm run dev` with nodemon)

## Routes
- `POST /api/auth/register` - {name,email,password}
- `POST /api/auth/login` - {email,password}
- All `/api/transactions` routes require Authorization: Bearer <token>
