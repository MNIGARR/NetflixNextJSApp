# Netflix Next.js App

A full-stack Netflix-inspired streaming UI and API built with **Next.js (App Router)** on the frontend and **Express + MongoDB** on the backend.

This project demonstrates:
- authentication (signup/login with JWT),
- TMDB-powered movie/TV discovery,
- protected API routes,
- user-specific search history,
- and a modern React/Next.js client experience.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Features](#features)
- [API Overview](#api-overview)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Run the Project](#run-the-project)
- [Known Gaps & Notes](#known-gaps--notes)
- [Roadmap Ideas](#roadmap-ideas)

---

## Project Overview

The app includes two main modules:

1. **`netflix-front`** — Next.js frontend with pages for landing, authentication, home feed, and dynamic media details.
2. **`netflix-back`** — Express API server for auth, movie/TV data aggregation via TMDB, and user search history persistence in MongoDB.

TMDB provides catalog metadata (trending, details, trailers, similar titles, and search), while MongoDB stores user accounts and history.

---

## Architecture

```text
Next.js Client (netflix-front)
  ├─ Auth pages (signup/login)
  ├─ Landing/Entry page with trending previews
  ├─ Home page with tabbed discovery (Home / TV / Movies)
  └─ Dynamic media detail page
            │
            ▼
Express API (netflix-back)
  ├─ /api/v1/auth    (signup/login/logout/authCheck)
  ├─ /api/v1/movie   (trending, details, trailers, similar, category)
  ├─ /api/v1/tv      (trending, details, trailers, similar, category)
  └─ /api/v1/search  (person/movie/tv search + history)
            │
            ▼
MongoDB (users + searchHistory)
            │
            ▼
TMDB API (content source)
```

---

## Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **CSS Modules** (+ global styles)

### Backend
- **Node.js + Express 4**
- **MongoDB + Mongoose**
- **JWT** authentication
- **bcryptjs** password hashing
- **Axios** for TMDB API calls

---

## Repository Structure

```text
.
├── README.md
├── netflix-front/
│   ├── src/app/
│   │   ├── entry/            # Landing page + marketing components
│   │   ├── login/            # Sign in page
│   │   ├── signup/           # Sign up page
│   │   ├── home/             # Main browse experience
│   │   ├── [type]/[id]/      # Dynamic media detail route
│   │   └── context/          # Auth context provider
│   ├── lib/                  # Frontend API helpers & shared types
│   ├── public/               # Static assets
│   └── styles/               # CSS modules
└── netflix-back/
    ├── server.js             # Express entry point
    ├── config/               # Env + DB connection
    ├── controllers/          # Route handlers
    ├── middleware/           # Auth middleware
    ├── models/               # Mongoose schemas
    ├── routes/               # API route definitions
    ├── services/             # TMDB integration
    └── utils/                # JWT cookie helper
```

---

## Features

### Authentication
- User signup and login endpoints.
- Password hashing with bcrypt.
- JWT creation on login/signup.
- Protected route middleware validates bearer token.

### Content Discovery
- Trending movies and TV shows.
- Movie/TV details, trailers, and similar titles.
- Category-based browsing endpoints.

### Search & Personalization
- Search by person, movie, and TV show.
- Search history persisted per user.
- Ability to remove history items.

### Frontend Experience
- Netflix-style entry page with sections/components.
- Login and signup flows.
- Tabbed home experience (Home, TV Shows, Movies).
- Dynamic details page with trailer + similar content.

---

## API Overview

Base URL (as designed):

```text
/api/v1
```

### Auth
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/authCheck` (protected)

### Movies
- `GET /movie/trending`
- `GET /movie/:id/details`
- `GET /movie/:id/trailers` (protected)
- `GET /movie/:id/similar` (protected)
- `GET /movie/:category` (protected)

### TV
- `GET /tv/trending`
- `GET /tv/:id/details`
- `GET /tv/:id/trailers` (protected)
- `GET /tv/:id/similar` (protected)
- `GET /tv/:category` (protected)

### Search (protected at mount level)
- `GET /search/person/:query`
- `GET /search/movie/:query`
- `GET /search/tv/:query`
- `GET /search/history`
- `DELETE /search/history/:id`

---

## Environment Variables

Create a `.env` file in `netflix-back/`:

```env
MONGO_URI=<your_mongodb_connection_string>
PORT=8800
JWT_SECRET=<your_jwt_secret>
NODE_ENV=development
TMDB_API_KEY=<your_tmdb_bearer_token>
```

> `TMDB_API_KEY` should be the TMDB **Bearer token** used in the `Authorization: Bearer ...` header.

---

## Getting Started

### 1) Prerequisites
- Node.js 18+
- npm 9+
- MongoDB instance (local or Atlas)
- TMDB account + API bearer token

### 2) Install dependencies

```bash
npm install --prefix netflix-back
npm install --prefix netflix-front
```

---

## Run the Project

Open two terminals.

### Terminal A — Backend

```bash
npm run dev --prefix netflix-back
```

### Terminal B — Frontend

```bash
npm run dev --prefix netflix-front
```

Then open:

```text
http://localhost:3000
```

---

## Known Gaps & Notes

This repository is functional but still early-stage. A few implementation details should be aligned for smoother developer experience:

1. **API base URL inconsistencies in frontend**
   - Different pages use different hardcoded backend ports (`8800` and `5001`).
   - Recommend introducing a single frontend env var (e.g., `NEXT_PUBLIC_API_BASE_URL`) and using it everywhere.

2. **Backend default port mismatch**
   - Backend env defaults to `5000`, while frontend helpers expect `8800`.
   - Set `PORT=8800` in backend `.env` (or update frontend URLs accordingly).

3. **Cookie vs bearer token flow**
   - Backend issues a cookie and also returns token in login response.
   - Protected middleware currently checks bearer token in `Authorization` header.
   - Consider standardizing on one auth transport strategy for clarity.

4. **Production build path in backend**
   - Backend `server.js` serves `frontend/dist`, which does not match a default Next.js output path.
   - For deployment, add a dedicated Next.js deployment strategy (Vercel, standalone output, or reverse-proxy setup).

---

## Roadmap Ideas

- Add global API client with retry/error boundaries.
- Move hardcoded endpoints to environment-based config.
- Add server/client validation schemas.
- Add unit/integration tests (Jest/Vitest + supertest + Playwright).
- Improve accessibility and responsive behavior.
- Add CI workflow (lint/test/build).
- Introduce role-based auth/session refresh strategy.

---

## Disclaimer

This project is an educational Netflix-style clone and is not affiliated with Netflix. Content metadata and assets are fetched from TMDB under their API terms.
