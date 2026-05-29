# PROJECT.md — AI-Powered Youth Wellness Platform

## 1. Project Overview

Build a full-stack web platform focused on helping young people manage **stress and anxiety** through daily mood tracking, wellness habit monitoring, visual insights, daily challenges, personalized recommendations, and an AI-powered psychological support assistant.

The platform should be inspired by the HBSC study themes related to youth wellbeing, including:

- mental health
- stress and anxiety
- sleep
- healthy habits
- school pressure
- emotional literacy
- social support
- digital wellbeing
- balance between online and offline life

The goal is not to build a clinical medical product, but a **supportive digital wellbeing tool** for young people.

---

## 2. Assignment Guidelines That Must Be Followed

This project must satisfy the course assignment requirements.

The final solution must:

1. Address a real and current problem among young people.
2. Promote healthy life habits.
3. Support psychological wellbeing.
4. Encourage social connection and emotional awareness.
5. Be modern, interactive, and attractive for a youth audience.
6. Include a functional prototype or demo.
7. Include UI/UX design.
8. Include interactivity and clear application logic.
9. Be based on a clearly defined idea:
   - what problem is being solved
   - who the target group is
   - how the solution works
   - what impact is expected
10. Be suitable for submission as:
   - GitHub repository
   - deployed website
   - ZIP folder
   - or functional prototype/demo

The professor explicitly allows solutions such as:

- mood tracking platforms
- wellness challenge systems
- interactive psychological advice systems
- dashboards and data visualization
- AI or data-driven solutions
- recommendation systems
- AI assistants for healthy habits

This project should therefore combine:

- web application
- mood tracker
- wellness dashboard
- daily challenges
- personalized recommendation system
- AI wellbeing assistant

---

## 3. Problem Definition

Many young people experience stress, anxiety, school pressure, poor sleep, low physical activity, loneliness, and unhealthy digital habits.

However, they often do not:

- track their emotional state
- understand what affects their mood
- recognize unhealthy patterns
- know how sleep, screen time, school pressure, and physical activity affect stress
- receive daily encouragement to build better habits
- have a safe space to reflect on problems

This platform helps users become more aware of their wellbeing and supports them with small, practical, personalized steps.

---

## 4. Target Users

Primary target group:

- young people / students aged approximately 11–18

Secondary target group:

- university students or young adults can also use the platform, but the UI and language should be designed primarily for teenagers.

The app should use simple, warm, non-clinical language.

Avoid presenting the platform as a replacement for therapy or professional psychological help.

---

## 5. Main Product Concept

The platform allows users to submit a daily wellness check-in.

Each check-in includes:

- mood
- stress level
- anxiety level
- sleep duration
- sleep quality
- physical activity
- screen time
- school pressure
- social interaction
- optional journal note

The system stores this data and uses it to:

1. show trends on a dashboard
2. calculate a wellness score
3. recommend small improvements
4. assign daily wellness challenges
5. provide context to an AI assistant

The AI assistant should be able to talk with the user in a supportive way and use the user's wellness history to personalize advice.

---

## 6. Technology Stack

### Frontend

Use:

- React
- Tailwind CSS
- Chart.js or Recharts for charts

Recommended:

- Vite for React setup
- React Router for routing
- Axios or Fetch API for backend requests
- Recharts preferred for simpler React integration

### Backend

Use:

- Django
- Django REST Framework

Recommended packages:

- djangorestframework
- django-cors-headers
- python-dotenv
- psycopg2-binary
- openai

### Database

Use:

- PostgreSQL

For local development, use Docker Compose if possible.

### AI

Use:

- OpenAI API

The API key must never be committed to GitHub.

Store it in:

```env
OPENAI_API_KEY=...
```

The backend should call the OpenAI API.  
The frontend must never directly call OpenAI.

---

## 7. High-Level Architecture

```text
React Frontend
    |
    | HTTP/JSON
    v
Django REST Framework API
    |
    | ORM
    v
PostgreSQL Database

Django Backend
    |
    | Secure server-side API call
    v
OpenAI API
```

The frontend is responsible for:

- UI
- forms
- charts
- dashboard
- chat interface

The backend is responsible for:

- authentication
- database models
- business logic
- wellness score calculation
- recommendation generation
- challenge assignment
- OpenAI API calls
- AI safety rules

The database stores:

- users
- daily wellness entries
- challenges
- completed challenges
- recommendations
- chat sessions
- chat messages

---

## 8. Core Features

## 8.1 User Authentication

Implement basic authentication.

Required functionality:

- register
- login
- logout
- authenticated API requests
- each user can only access their own data

Acceptable options:

- Django session auth
- JWT auth
- DRF token auth

Recommended for simplicity:

- JWT authentication using `djangorestframework-simplejwt`

Pages:

- `/register`
- `/login`
- `/dashboard`

---

## 8.2 Daily Wellness Check-In

Create a form where the user enters their daily wellbeing data.

Fields:

| Field | Type | Range / Example |
|---|---|---|
| date | date | default today |
| mood | integer | 1–10 |
| stress_level | integer | 1–10 |
| anxiety_level | integer | 1–10 |
| sleep_hours | decimal | 0–14 |
| sleep_quality | integer | 1–10 |
| physical_activity_minutes | integer | 0–300 |
| screen_time_hours | decimal | 0–16 |
| school_pressure | integer | 1–10 |
| social_interaction_level | integer | 1–10 |
| journal_note | text | optional |

Validation rules:

- user cannot create multiple entries for the same date
- numeric fields must stay inside allowed ranges
- journal note is optional
- date cannot be far in the future

Example frontend route:

```text
/check-in
```

Example API endpoint:

```text
POST /api/wellness-entries/
GET /api/wellness-entries/
GET /api/wellness-entries/{id}/
PUT /api/wellness-entries/{id}/
DELETE /api/wellness-entries/{id}/
```

---

## 8.3 Wellness Score

For each daily entry, calculate a wellness score from 0 to 100.

The score should be understandable and not medically diagnostic.

Suggested formula:

```text
positive factors:
- good mood
- good sleep quality
- enough sleep
- physical activity
- social interaction

negative factors:
- high stress
- high anxiety
- high school pressure
- excessive screen time
```

Example scoring logic:

```python
score = 50

score += (mood - 5) * 3
score += (sleep_quality - 5) * 2
score += min(physical_activity_minutes / 30, 2) * 5
score += (social_interaction_level - 5) * 2

score -= (stress_level - 5) * 3
score -= (anxiety_level - 5) * 3
score -= (school_pressure - 5) * 2

if sleep_hours < 6:
    score -= 10
elif 7 <= sleep_hours <= 9:
    score += 8

if screen_time_hours > 6:
    score -= 8

score = max(0, min(100, score))
```

Store the calculated score in the database or calculate it dynamically in the serializer.

Recommendation:

- calculate in backend
- expose in API response

Important:

- Do not tell users that this is a medical score.
- Present it as a personal wellbeing indicator.

Possible UI labels:

- 0–39: "Difficult day"
- 40–59: "Needs care"
- 60–79: "Balanced"
- 80–100: "Strong wellbeing day"

---

## 8.4 Dashboard

Create a dashboard with visual summaries.

Route:

```text
/dashboard
```

The dashboard should include:

1. Today's wellness summary
2. Latest wellness score
3. Mood trend over time
4. Stress trend over time
5. Anxiety trend over time
6. Sleep vs stress comparison
7. Physical activity trend
8. Screen time trend
9. Completed challenges count
10. Recent recommendations

Charts to implement:

### Line Chart

- mood over last 7/14/30 days
- stress over last 7/14/30 days
- anxiety over last 7/14/30 days

### Bar Chart

- sleep hours per day
- physical activity minutes per day
- screen time hours per day

### Simple Insight Cards

Examples:

- "Your stress was highest on days with less than 6 hours of sleep."
- "You completed 4 wellness challenges this week."
- "Your average mood this week is 7.1."

The insight logic can be rule-based.

---

## 8.5 Daily Wellness Challenges

The platform should give the user one daily challenge.

Examples:

- Take a 10-minute walk.
- Write down three things you are grateful for.
- Avoid social media one hour before sleep.
- Try a 2-minute breathing exercise.
- Talk to a friend or family member.
- Drink enough water today.
- Clean your study space.
- Write one positive thing about yourself.
- Stretch for 5 minutes.
- Take a short break after studying.

Models:

- Challenge
- UserChallenge

Challenge fields:

| Field | Type |
|---|---|
| title | string |
| description | text |
| category | string |
| difficulty | easy/medium/hard |
| estimated_minutes | integer |
| is_active | boolean |

UserChallenge fields:

| Field | Type |
|---|---|
| user | foreign key |
| challenge | foreign key |
| assigned_date | date |
| completed | boolean |
| completed_at | datetime nullable |

Challenge categories:

- sleep
- stress
- anxiety
- physical activity
- social connection
- digital wellbeing
- self-confidence
- emotional literacy

API endpoints:

```text
GET /api/challenges/today/
POST /api/challenges/{id}/complete/
GET /api/challenges/history/
```

Daily assignment logic:

- If the user already has a challenge for today, return it.
- Otherwise assign a random active challenge.
- Later enhancement: assign challenge based on user's weak area.

Example:

- if sleep is poor, assign sleep challenge
- if stress is high, assign breathing/journaling challenge
- if screen time is high, assign digital wellbeing challenge
- if social interaction is low, assign social connection challenge

---

## 8.6 Personalized Recommendations

The platform should generate personalized recommendations based on recent wellness data.

Start with rule-based recommendations.

Example rules:

### Sleep

If average sleep over last 3 days is below 6 hours:

```text
Your sleep has been low recently. Try going to bed 30 minutes earlier tonight and avoid screens before sleeping.
```

### Stress

If stress level is greater than or equal to 8:

```text
Your stress level is high today. Try a short breathing exercise or take a 10-minute break from school tasks.
```

### Anxiety

If anxiety level is greater than or equal to 8:

```text
Your anxiety level seems high. Try grounding yourself by naming 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.
```

### Screen Time

If screen time is greater than 6 hours:

```text
Your screen time is high today. Try setting a one-hour offline period before sleep.
```

### Physical Activity

If physical activity is below 15 minutes for several days:

```text
You have had low physical activity recently. A short walk can help reduce stress and improve mood.
```

Create an endpoint:

```text
GET /api/recommendations/
```

It should return:

- current recommendations
- reason for each recommendation
- related wellness metric
- priority level

Recommendation fields:

| Field | Type |
|---|---|
| user | foreign key |
| title | string |
| message | text |
| category | string |
| priority | low/medium/high |
| created_at | datetime |
| source | rule_based / ai |

---

## 8.7 AI Wellbeing Assistant

Create an AI chat assistant.

The assistant should:

- talk with the user in a supportive and empathetic way
- answer questions about stress, anxiety, sleep, habits, and emotional wellbeing
- help the user reflect on problems
- suggest simple coping strategies
- use the user's recent wellness data for personalized advice
- remind the user that it is not a replacement for professional help
- encourage reaching out to trusted adults or professionals when needed

The assistant must not:

- diagnose the user
- claim to be a therapist, doctor, psychologist, or medical professional
- provide emergency mental health intervention as if it were a crisis service
- encourage self-harm
- give dangerous advice
- shame or judge the user
- overstate certainty

Use safe positioning:

```text
I am a supportive wellbeing assistant, not a replacement for a real psychologist or emergency service.
```

### AI Context

When the user sends a message, the backend should gather recent data:

- last 7 wellness entries
- recent stress/anxiety levels
- sleep patterns
- recent challenges
- recent recommendations

Then send this context to OpenAI.

Do not send unnecessary personal data.

Example context:

```text
User wellness summary:
- Average mood last 7 days: 6.4/10
- Average stress last 7 days: 7.8/10
- Average anxiety last 7 days: 7.1/10
- Average sleep: 5.9 hours
- Screen time average: 6.5 hours
- Recent challenge completed: "Take a 10-minute walk"
```

### AI System Prompt

Use this prompt on the backend:

```text
You are a supportive youth wellbeing assistant inside a web platform for stress and anxiety management.

Your role:
- provide warm, practical, non-judgmental emotional support
- help users reflect on stress, anxiety, sleep, school pressure, social connection, and healthy habits
- suggest simple coping strategies such as breathing, journaling, taking breaks, physical activity, talking to trusted people, and improving sleep habits
- use the user's wellness data when available to personalize advice

Safety rules:
- You are not a therapist, psychologist, doctor, or emergency service.
- Do not diagnose mental health conditions.
- Do not prescribe medication.
- Do not tell the user to stop medication or ignore professional advice.
- If the user mentions self-harm, suicide, abuse, or immediate danger, respond with empathy and encourage them to contact emergency services, a trusted adult, a school counselor, or a mental health professional immediately.
- Keep responses short, clear, and suitable for young people.
- Encourage healthy habits and social support.
```

### Chat API Endpoints

```text
POST /api/chat/sessions/
GET /api/chat/sessions/
GET /api/chat/sessions/{id}/messages/
POST /api/chat/sessions/{id}/messages/
```

Models:

### ChatSession

| Field | Type |
|---|---|
| user | foreign key |
| title | string |
| created_at | datetime |
| updated_at | datetime |

### ChatMessage

| Field | Type |
|---|---|
| session | foreign key |
| sender | user/assistant |
| content | text |
| created_at | datetime |

Flow:

1. User sends message.
2. Backend saves user message.
3. Backend fetches recent wellness data.
4. Backend builds OpenAI prompt.
5. Backend calls OpenAI API.
6. Backend saves assistant response.
7. Backend returns assistant response to frontend.

---

## 9. Pages to Build

## 9.1 Landing Page

Route:

```text
/
```

Purpose:

Explain the platform.

Sections:

- hero section
- problem statement
- how the platform helps
- feature cards
- call to action
- disclaimer

Example headline:

```text
Understand your mood. Reduce stress. Build healthier habits.
```

Example subtitle:

```text
A youth wellbeing platform that helps you track stress, anxiety, sleep, and daily habits while receiving personalized support and challenges.
```

---

## 9.2 Register Page

Route:

```text
/register
```

Fields:

- username
- email
- password
- confirm password

---

## 9.3 Login Page

Route:

```text
/login
```

Fields:

- username/email
- password

---

## 9.4 Dashboard Page

Route:

```text
/dashboard
```

Include:

- wellness score card
- latest mood/stress/anxiety cards
- charts
- today's challenge
- latest recommendations
- button to start check-in
- button to open AI assistant

---

## 9.5 Daily Check-In Page

Route:

```text
/check-in
```

Include form fields for:

- mood
- stress
- anxiety
- sleep
- physical activity
- screen time
- school pressure
- social interaction
- journal note

Use sliders for 1–10 values.

Use friendly labels:

- "How was your mood today?"
- "How stressed did you feel?"
- "How anxious did you feel?"
- "How many hours did you sleep?"
- "How much time did you spend on screens?"

---

## 9.6 History Page

Route:

```text
/history
```

Show:

- list/table of past wellness entries
- filters by date range
- option to open entry details
- option to edit/delete entries

---

## 9.7 Challenges Page

Route:

```text
/challenges
```

Show:

- today's challenge
- complete button
- previous completed challenges
- challenge streak
- challenge categories

---

## 9.8 AI Assistant Page

Route:

```text
/assistant
```

Show:

- chat interface
- message input
- previous messages
- safe disclaimer
- suggested prompt buttons

Suggested prompt buttons:

- "I feel stressed about school"
- "Help me calm down"
- "Why am I anxious today?"
- "Give me a breathing exercise"
- "What can I do before sleep?"
- "Can you look at my recent wellness data?"

---

## 9.9 Recommendations Page

Route:

```text
/recommendations
```

Show:

- personalized recommendations
- category
- reason
- priority
- related metric

---

## 10. Backend Django Apps

Recommended Django project structure:

```text
backend/
  manage.py
  config/
    settings.py
    urls.py
  accounts/
    models.py
    serializers.py
    views.py
    urls.py
  wellness/
    models.py
    serializers.py
    views.py
    urls.py
    services.py
  challenges/
    models.py
    serializers.py
    views.py
    urls.py
    services.py
  recommendations/
    models.py
    serializers.py
    views.py
    urls.py
    services.py
  ai_assistant/
    models.py
    serializers.py
    views.py
    urls.py
    services.py
```

---

## 11. Frontend Structure

Recommended React structure:

```text
frontend/
  src/
    api/
      axiosClient.js
      authApi.js
      wellnessApi.js
      challengesApi.js
      recommendationsApi.js
      chatApi.js

    components/
      Navbar.jsx
      Sidebar.jsx
      ProtectedRoute.jsx
      WellnessScoreCard.jsx
      MetricCard.jsx
      ChartCard.jsx
      ChallengeCard.jsx
      RecommendationCard.jsx
      ChatMessage.jsx

    pages/
      LandingPage.jsx
      LoginPage.jsx
      RegisterPage.jsx
      DashboardPage.jsx
      CheckInPage.jsx
      HistoryPage.jsx
      ChallengesPage.jsx
      RecommendationsPage.jsx
      AssistantPage.jsx

    context/
      AuthContext.jsx

    utils/
      dateUtils.js
      scoreUtils.js

    App.jsx
    main.jsx
```

Use Tailwind CSS for styling.

The UI should feel:

- calm
- modern
- clean
- soft
- youth-friendly
- not too clinical

Suggested design style:

- rounded cards
- soft background
- clear icons
- simple charts
- encouraging text
- mobile-responsive layout

---

## 12. Database Models

## 12.1 DailyWellnessEntry

```python
class DailyWellnessEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="wellness_entries")
    date = models.DateField()

    mood = models.PositiveSmallIntegerField()
    stress_level = models.PositiveSmallIntegerField()
    anxiety_level = models.PositiveSmallIntegerField()

    sleep_hours = models.DecimalField(max_digits=4, decimal_places=1)
    sleep_quality = models.PositiveSmallIntegerField()

    physical_activity_minutes = models.PositiveIntegerField(default=0)
    screen_time_hours = models.DecimalField(max_digits=4, decimal_places=1)

    school_pressure = models.PositiveSmallIntegerField()
    social_interaction_level = models.PositiveSmallIntegerField()

    journal_note = models.TextField(blank=True)

    wellness_score = models.PositiveSmallIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "date")
        ordering = ["-date"]
```

Validation:

- mood, stress, anxiety, sleep_quality, school_pressure, social_interaction_level must be 1–10
- sleep_hours should be 0–14
- screen_time_hours should be 0–16
- physical_activity_minutes should be 0–300

---

## 12.2 Challenge

```python
class Challenge(models.Model):
    CATEGORY_CHOICES = [
        ("sleep", "Sleep"),
        ("stress", "Stress"),
        ("anxiety", "Anxiety"),
        ("activity", "Physical Activity"),
        ("digital", "Digital Wellbeing"),
        ("social", "Social Connection"),
        ("confidence", "Self Confidence"),
        ("emotional", "Emotional Literacy"),
    ]

    DIFFICULTY_CHOICES = [
        ("easy", "Easy"),
        ("medium", "Medium"),
        ("hard", "Hard"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default="easy")
    estimated_minutes = models.PositiveIntegerField(default=5)
    is_active = models.BooleanField(default=True)
```

---

## 12.3 UserChallenge

```python
class UserChallenge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_challenges")
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    assigned_date = models.DateField()
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ("user", "assigned_date")
        ordering = ["-assigned_date"]
```

---

## 12.4 Recommendation

```python
class Recommendation(models.Model):
    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]

    SOURCE_CHOICES = [
        ("rule_based", "Rule Based"),
        ("ai", "AI"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recommendations")
    title = models.CharField(max_length=255)
    message = models.TextField()
    category = models.CharField(max_length=50)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default="rule_based")
    related_metric = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

---

## 12.5 ChatSession

```python
class ChatSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_sessions")
    title = models.CharField(max_length=255, default="New conversation")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

---

## 12.6 ChatMessage

```python
class ChatMessage(models.Model):
    SENDER_CHOICES = [
        ("user", "User"),
        ("assistant", "Assistant"),
    ]

    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name="messages")
    sender = models.CharField(max_length=20, choices=SENDER_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
```

---

## 13. API Endpoints

Use RESTful API design.

### Auth

```text
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/logout/
GET  /api/auth/me/
```

If using JWT:

```text
POST /api/token/
POST /api/token/refresh/
```

### Wellness

```text
GET    /api/wellness-entries/
POST   /api/wellness-entries/
GET    /api/wellness-entries/{id}/
PUT    /api/wellness-entries/{id}/
PATCH  /api/wellness-entries/{id}/
DELETE /api/wellness-entries/{id}/
GET    /api/wellness-summary/
```

`/api/wellness-summary/` should return:

```json
{
  "latest_entry": {},
  "average_mood": 6.8,
  "average_stress": 7.2,
  "average_anxiety": 6.9,
  "average_sleep": 6.1,
  "average_screen_time": 5.8,
  "average_wellness_score": 64,
  "entries_last_7_days": [],
  "insights": []
}
```

### Challenges

```text
GET  /api/challenges/
GET  /api/challenges/today/
POST /api/challenges/{id}/complete/
GET  /api/challenges/history/
```

### Recommendations

```text
GET  /api/recommendations/
POST /api/recommendations/generate/
```

### AI Assistant

```text
POST /api/chat/sessions/
GET  /api/chat/sessions/
GET  /api/chat/sessions/{id}/messages/
POST /api/chat/sessions/{id}/messages/
```

---

## 14. AI Safety and Crisis Handling

The assistant must include basic safety handling.

Before sending a message to OpenAI or before returning a response, detect crisis keywords such as:

- suicide
- kill myself
- self harm
- hurt myself
- abuse
- danger
- unsafe at home

If detected, the assistant should respond with a safe message.

Example:

```text
I'm really sorry you're feeling this way. You deserve immediate support from a real person. Please contact emergency services in your country, reach out to a trusted adult, parent, teacher, school counselor, or a mental health professional as soon as possible. If you are in immediate danger, call emergency services now.
```

Do not try to solve crisis situations through the chatbot.

For non-crisis conversations, use the OpenAI assistant normally.

---

## 15. Privacy and Data Handling

Because this app stores sensitive wellbeing data, implement basic privacy principles:

1. Users can only access their own data.
2. Do not expose wellness entries across users.
3. Do not send unnecessary personal data to OpenAI.
4. Do not store OpenAI API keys in frontend code.
5. Use environment variables.
6. Add a disclaimer that the platform is not a medical service.
7. Do not show public leaderboards for mental health data.
8. Keep journal notes private.

Add a simple disclaimer on the landing page and assistant page:

```text
This platform provides wellbeing support and self-reflection tools. It is not a replacement for therapy, medical advice, or emergency mental health support.
```

---

## 16. Seed Data

Create seed challenges.

Minimum 20 challenges.

Examples:

```text
1. Take a 10-minute walk.
2. Write down three things you are grateful for.
3. Avoid screens 30 minutes before bed.
4. Try box breathing for 2 minutes.
5. Drink a glass of water.
6. Stretch for 5 minutes.
7. Write one thing that went well today.
8. Message a friend.
9. Clean your study space.
10. Take a short study break.
11. Listen to calming music for 5 minutes.
12. Prepare your school bag before sleeping.
13. Write one worry and one possible solution.
14. Spend 15 minutes offline.
15. Do one kind thing for someone.
16. Write one thing you like about yourself.
17. Go outside for fresh air.
18. Practice the 5-4-3-2-1 grounding technique.
19. Plan tomorrow's top three tasks.
20. Try a short guided relaxation exercise.
```

---

## 17. Minimum Viable Product

The MVP must include:

1. Authentication
2. Daily wellness check-in
3. Wellness dashboard with charts
4. Wellness score
5. Daily challenge
6. Challenge completion
7. Rule-based recommendations
8. AI assistant with OpenAI API
9. Basic privacy and safety disclaimers
10. Clean responsive UI

Do not over-engineer before the MVP is complete.

---

## 18. Nice-to-Have Features

Implement only after MVP is done:

- streak system
- calendar heatmap
- AI-generated weekly report
- export wellness data as PDF
- dark mode
- notification reminders
- gamified badges
- comparison with anonymous HBSC-inspired averages
- admin panel for managing challenges
- multilingual support: English and Macedonian
- sentiment analysis of journal notes
- advanced pattern detection

---

## 19. Suggested Development Order

Follow this order:

### Phase 1 — Project Setup

1. Create Django backend.
2. Create React frontend.
3. Configure PostgreSQL.
4. Configure CORS.
5. Configure environment variables.
6. Add authentication.

### Phase 2 — Wellness Tracking

1. Create DailyWellnessEntry model.
2. Add serializers and views.
3. Add wellness score calculation.
4. Create check-in form.
5. Connect frontend to backend.

### Phase 3 — Dashboard

1. Add summary endpoint.
2. Create dashboard cards.
3. Add charts.
4. Add simple insights.

### Phase 4 — Challenges

1. Create Challenge model.
2. Create UserChallenge model.
3. Seed challenge data.
4. Implement today's challenge endpoint.
5. Implement complete challenge action.
6. Build challenge UI.

### Phase 5 — Recommendations

1. Implement rule-based recommendation service.
2. Create recommendation endpoint.
3. Display recommendations in frontend.

### Phase 6 — AI Assistant

1. Create ChatSession and ChatMessage models.
2. Implement chat endpoints.
3. Add OpenAI service.
4. Add wellness context builder.
5. Add safety disclaimer.
6. Build chat UI.

### Phase 7 — Polish

1. Improve UI.
2. Add responsive design.
3. Add loading states.
4. Add error messages.
5. Add empty states.
6. Add README.
7. Prepare demo data.
8. Test complete user flow.

---

## 20. Environment Variables

Backend `.env`:

```env
DEBUG=True
SECRET_KEY=replace_this
DATABASE_NAME=wellness_db
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
OPENAI_API_KEY=replace_this
FRONTEND_URL=http://localhost:5173
```

Frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## 21. Docker Compose Recommendation

Create a `docker-compose.yml` for PostgreSQL at minimum.

Example:

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: wellness_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Optional later:

- containerize backend
- containerize frontend

---

## 22. README Requirements

Create a `README.md` with:

1. Project title
2. Short description
3. Problem statement
4. Target users
5. Features
6. Tech stack
7. Setup instructions
8. Environment variables
9. Screenshots
10. Demo credentials
11. Disclaimer
12. Course assignment connection

---

## 23. Final Demo Scenario

The demo should show this flow:

1. User opens landing page.
2. User registers/logs in.
3. User fills in daily wellness check-in.
4. Dashboard updates with charts and wellness score.
5. User receives daily challenge.
6. User completes challenge.
7. User opens recommendations.
8. User opens AI assistant.
9. User asks: "I feel stressed because of school. What can I do?"
10. Assistant responds with personalized advice using wellness data.

---

## 24. Expected Impact

The platform should help young people:

- become more aware of stress and anxiety patterns
- understand the connection between habits and wellbeing
- improve sleep and daily routines
- reduce screen time
- build emotional literacy
- practice small self-care habits
- feel supported through an AI assistant
- recognize when they should seek real human support

The final project should clearly explain that the solution contributes to youth wellbeing through self-reflection, habit building, and accessible digital support.

---

## 25. Important Implementation Notes for the Coding Agent

Follow these rules:

1. Build a working prototype first.
2. Keep the code clean and modular.
3. Do not hardcode API keys.
4. Do not call OpenAI from the frontend.
5. Keep user data private.
6. Add validation on backend and frontend.
7. Use clear naming.
8. Use reusable React components.
9. Use DRF serializers properly.
10. Protect all user-specific endpoints.
11. Make charts readable and simple.
12. Keep AI responses safe and non-clinical.
13. Include disclaimers.
14. Make the UI polished enough for a course demo.
15. Make sure the app can be run locally from README instructions.

---

## 26. Definition of Done

The project is complete when:

- a user can register and log in
- a user can submit daily wellness data
- wellness score is calculated
- dashboard shows charts and summaries
- user receives daily challenge
- user can mark challenge as completed
- recommendations are generated from user data
- AI assistant works through backend OpenAI integration
- AI assistant uses wellness context
- app includes safety disclaimer
- app is responsive and visually clean
- README explains how to run the project
- project clearly matches the PNUV assignment goals

