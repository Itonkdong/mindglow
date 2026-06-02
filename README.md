# MindGlow Youth Wellness Platform

MindGlow is a full-stack youth wellbeing app for daily check-ins, private mood and habit tracking, challenge prompts, personalized recommendations, and a supportive AI assistant.

The product is designed to feel warm, calm, and non-clinical. It is not a replacement for therapy, medical advice, or emergency support.

## Demo Flow

Register a user, create a daily check-in, view the dashboard charts and score, complete the daily challenge, refresh recommendations, then ask the assistant: `I feel stressed because of school. What can I do?`


## Environment Setup

Copy the example environment files before starting the project:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Start With Docker

### Full Deployment Stack

Run the root compose file to build and start the deployment images for the backend, frontend, and PostgreSQL:

```bash
docker compose up --build
```

Then open:

```text
http://localhost:5173
```

The root stack uses:

- `backend/Dockerfile.deployment`
- `frontend/Dockerfile.deployment`
- `docker-compose.yml`

Set `AUTO_START_SETUP=true` in the root `.env` if the backend should run the cold-start setup automatically on container start.

## Features

- JWT registration, login, and user-owned data access
- One daily wellbeing check-in per user
- Wellness score calculation from mood, stress, anxiety, sleep, habits, and social/school pressure
- Dashboard with averages, charts, latest score, today's challenge, and recommendation preview
- Daily challenge assignment and completion tracking
- Rule-based recommendations generated from recent check-ins
- Multi-session wellbeing assistant chat
- Crisis keyword safety response before AI calls
- Responsive React UI

## Tech Stack

- Backend: Django, Django REST Framework, Simple JWT
- Database: PostgreSQL
- Frontend: React, Vite, Recharts, Axios, Lucide icons
- AI: OpenAI API through the Django backend
- Containers: Docker and Docker Compose

## Project Structure

```text
.
├── backend/
│   ├── Dockerfile
│   ├── Dockerfile.deployment
│   ├── docker-compose.yml
│   └── manage.py
├── frontend/
│   ├── Dockerfile
│   ├── Dockerfile.deployment
│   ├── docker-compose.yml
│   └── package.json
├── docker-compose.yml
└── .env.example
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


## Disclaimer

This platform provides wellbeing support and self-reflection tools. It is not a replacement for therapy, medical advice, or emergency mental health support. If someone is in immediate danger, they should contact emergency services or a trusted adult right away.


## License

This project is licensed under the MIT License. See `LICENSE` for details.
