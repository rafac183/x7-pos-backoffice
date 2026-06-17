# X7 POS Backoffice

React + Vite + TypeScript + Tailwind CSS frontend for X7 Point of Sale.

## Prerequisites

- Node.js 20+
- Backend API running (default: `http://localhost:3001`)

## Setup

```bash
cd x7-pos-backoffice
npm install
cp .env.example .env
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

API calls use the Vite proxy (`/api` → `http://localhost:3001`).

## Routes

| Path | Description |
|------|-------------|
| `/login` | Sign in |
| `/forgot-password` | Request password reset email |
| `/reset-password?token=…` | Set a new password from email link |
| `/` | Placeholder dashboard (requires login) |

## Backend configuration

Set `FRONTEND_URL=http://localhost:5173` in the backend `.env` so password-reset emails link to this app.
