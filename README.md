# 📚 Book Heaven

A full-stack book publishing and discovery platform. Users can sign up, become publishers, upload books (cover + PDF), like/unlike books, search, and filter by genre.

## Tech Stack

| Part     | Technology |
| -------- | ---------- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, React Router |
| Backend  | Node.js, Express, MongoDB (Mongoose) |
| Auth     | Sessions (express-session), bcrypt, Google OAuth2 (Passport) |
| Other    | Redis (password reset tokens), Multer (file uploads), Helmet, rate limiting |

## Project Structure

This is a single repo containing two independently deployable apps:

```
book-heaven/
├── backend/     # Express API (deploys to Render)
└── frontend/    # React app (deploys to Vercel)
```

## Features

- User signup/login with session-based auth, plus Google OAuth2
- Password reset via emailed token (Redis-backed, expiring)
- Become a publisher and upload books (cover image + PDF)
- Like/unlike books
- Search by title/genre, filter by genre
- Responsive UI

## Getting Started

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
DB_URL=your_mongodb_connection_string
SECRET=your_session_secret
EMAIL=your_gmail_address
APPCODE=your_gmail_app_password
BASE_URL=http://localhost:5173
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
```

Run the server:

```bash
node app.js
```

The API runs on `http://localhost:9000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

## Deployment

- **Backend** → Render, with Root Directory set to `backend/`
- **Frontend** → Vercel, with Root Directory set to `frontend/`

Make sure the backend's CORS config and `BASE_URL` env var point to the deployed frontend URL in production, not `localhost`.

## License

ISC