# MindGlow Youth Wellness Platform

MindGlow is a full-stack youth wellbeing prototype for daily mood tracking, stress and anxiety reflection, healthy habit challenges, personalized recommendations, and a safe AI-powered support assistant.

## Problem

Many young people deal with school pressure, stress, anxiety, poor sleep, loneliness, and high screen time without a simple way to notice patterns or take small practical steps. MindGlow helps students reflect on daily wellbeing and build healthier routines without presenting itself as a clinical or medical product.

## Target Users

The primary users are young people and students around ages 11-18. The language is warm, simple, and non-clinical, while still being useful for older students.

## Features

- JWT registration and login
- Daily wellness check-ins with mood, stress, anxiety, sleep, activity, screen time, school pressure, social connection, and optional journal notes
- Backend wellness score calculation from 0-100
- Dashboard with charts, averages, insights, latest score, recommendations, and today's challenge
- Daily wellness challenge assignment and completion tracking
- Rule-based personalized recommendations
- AI wellbeing assistant powered through the Django backend
- Crisis keyword safety response before contacting OpenAI
- User-owned private data access
- Responsive React UI with Tailwind configured

## Tech Stack

- Backend: Django, Django REST Framework, Simple JWT
- Database: PostgreSQL
- AI: OpenAI API, called only from Django
- Frontend: React, Vite, Tailwind CSS, Recharts, Axios, Lucide icons
- Local database: Docker Compose

## Setup

1. Copy environment values:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

2. Start PostgreSQL:

   ```bash
   docker compose up -d db
   ```

3. Install and run the backend:

   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py seed_challenges
   python manage.py runserver
   ```

4. Install and run the frontend in another terminal:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. Open `http://localhost:5173`.

## Environment Variables

Backend `backend/.env`:

```env
DEBUG=True
SECRET_KEY=replace_this
DATABASE_NAME=wellness_db
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
POSTGRES_DB=wellness_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432
OPENAI_API_KEY=replace_this
OPENAI_MODEL=gpt-4o-mini
FRONTEND_URL=http://localhost:5173
TIME_ZONE=Europe/Skopje
```

Frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## API Overview

- `POST /api/auth/register/`
- `POST /api/token/`
- `GET /api/auth/me/`
- `GET|POST /api/wellness-entries/`
- `GET /api/wellness-summary/`
- `GET /api/challenges/today/`
- `POST /api/challenges/{id}/complete/`
- `GET /api/recommendations/`
- `POST /api/recommendations/generate/`
- `GET|POST /api/chat/sessions/`
- `GET|POST /api/chat/sessions/{id}/messages/`

## Demo Flow

Register a user, create a daily check-in, view the dashboard charts and score, complete the daily challenge, refresh recommendations, then ask the assistant: `I feel stressed because of school. What can I do?`

## Disclaimer

This platform provides wellbeing support and self-reflection tools. It is not a replacement for therapy, medical advice, or emergency mental health support. If someone is in immediate danger, they should contact emergency services or a trusted adult right away.

## Course Assignment Connection

The project addresses youth stress, anxiety, sleep, physical activity, social connection, school pressure, digital wellbeing, and emotional literacy through a functional, interactive prototype with a dashboard, habit challenges, recommendations, and AI-supported reflection.
