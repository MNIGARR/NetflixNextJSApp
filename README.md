# Netflix Next.js App

A full-stack Netflix-inspired streaming application built with a **Next.js frontend** and an **Express/MongoDB backend**, integrating with the **TMDB API** for real movie and TV content discovery.

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1) Backend Setup](#1-backend-setup)
  - [2) Frontend Setup](#2-frontend-setup)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Authentication Flow](#authentication-flow)
- [Notes & Current Limitations](#notes--current-limitations)
- [Roadmap Suggestions](#roadmap-suggestions)

---

## Overview

This repository contains two applications:

- **`netflix-front`**: Next.js 15 + React 19 client UI for landing, auth, home feed, and details pages.
- **`netflix-back`**: Express API that handles authentication, protected endpoints, TMDB proxying, and user search history persistence in MongoDB.

The backend acts as a secure integration layer with TMDB while also managing user accounts and JWT-based route protection.

---

## Architecture

```text
Browser (Next.js App)
  ├─ Public Pages: /entry, /login, /signup
  ├─ App Pages: /home, /[type]/[id]
  └─ Calls Backend REST API

Express API (Node.js)
  ├─ /api/v1/auth   (signup/login/logout/authCheck)
  ├─ /api/v1/movie  (trending/details/trailers/similar/category)
  ├─ /api/v1/tv     (trending/details/trailers/similar/category)
  └─ /api/v1/search (protected search + history)
       ├─ MongoDB (users + search history)
       └─ TMDB API (content source)
```

---

## Core Features

### Frontend
- Netflix-style **entry page** with hero, trending carousel, feature cards, FAQ, and footer.
- **Signup and login** flows with client-side state and API integration.
- **Home experience** with tabbed sections (Home / TV Shows / Movies).
- **Detail page** for both movies and TV shows showing trailer, metadata, and similar content.

### Backend
- User **signup/login/logout** with password hashing (`bcryptjs`) and JWT issuance.
- JWT-protected routes for selected movie/TV/search operations.
- TMDB-powered endpoints for trending, details, trailers, similar items, and category queries.
- User **search history persistence** in MongoDB, with delete support.

---

## Tech Stack

### Frontend (`netflix-front`)
- Next.js 15
- React 19
- TypeScript
- CSS Modules
- Framer Motion

### Backend (`netflix-back`)
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcryptjs for password hashing
- Axios for external API communication

---

## Project Structure

```text
.
├─ netflix-front/
│  ├─ src/app/
│  │  ├─ entry/
│  │  ├─ home/
│  │  ├─ login/
│  │  ├─ signup/
│  │  ├─ [type]/[id]/
│  │  └─ context/AuthContext.tsx
│  ├─ lib/api.ts
│  ├─ styles/
│  └─ public/
├─ netflix-back/
│  ├─ config/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ services/
│  ├─ utils/
│  └─ server.js
└─ README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- MongoDB instance (local or cloud)
- TMDB API bearer token

### 1) Backend Setup

```bash
cd netflix-back
npm install
```

Create a `.env` file in `netflix-back/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8800
JWT_SECRET=your_jwt_secret
NODE_ENV=development
TMDB_API_KEY=your_tmdb_bearer_token
```

Start backend:

```bash
npm run dev
```

### 2) Frontend Setup

```bash
cd netflix-front
npm install
npm run dev
```

Frontend runs by default on `http://localhost:3000`.

---

## Environment Variables

### Backend (`netflix-back/.env`)
- `MONGO_URI`: MongoDB connection string.
- `PORT`: API server port.
- `JWT_SECRET`: Secret used to sign/verify JWTs.
- `NODE_ENV`: e.g. `development` or `production`.
- `TMDB_API_KEY`: TMDB bearer token used in outbound API calls.

### Frontend
No `.env` is currently required because API URLs are hardcoded in source files.

---

## API Overview

Base URL (expected by frontend): `http://localhost:8800/api/v1`

### Auth
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/authCheck` (protected)

### Movie
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

### Search (all protected)
- `GET /search/person/:query`
- `GET /search/movie/:query`
- `GET /search/tv/:query`
- `GET /search/history`
- `DELETE /search/history/:id`

> Protected routes require `Authorization: Bearer <jwt_token>`.

---

## Authentication Flow

1. User signs up or logs in from frontend.
2. Backend validates credentials and returns JWT.
3. Frontend stores token in app state/localStorage usage patterns.
4. Token is sent as `Authorization` header to protected endpoints.
5. Backend middleware verifies JWT and attaches `req.user`.

---

## Notes & Current Limitations

- There are currently **inconsistent backend ports** referenced in frontend code (`8800` and `5001`). Standardizing to a single config value is recommended.
- Some frontend routes for details use mixed URL patterns and could be unified for consistency.
- FAQ answers are placeholders.
- Backend production static-serving path references `frontend/dist`, which does not match the current Next.js app directory (`netflix-front`).

---

## Roadmap Suggestions

- Centralize frontend API base URL via environment variable (e.g. `NEXT_PUBLIC_API_BASE_URL`).
- Add refresh token strategy and auth persistence improvements.
- Add route-level loading/error states and reusable API client wrappers.
- Add testing (unit + integration + e2e).
- Add Docker + docker-compose for one-command local startup.
- Add CI (lint, typecheck, build, test).

---

If you’d like, I can also generate:
- a **contributor-focused README variant**,
- **Swagger/OpenAPI docs** for all backend endpoints,
- and a **deployment guide** (Vercel + Render/Railway).
